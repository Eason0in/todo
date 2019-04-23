const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = passport => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email'
      },
      (email, password, done) => {
        User.findOne({ email: email }).then(user => {
          if (!user) done(null, false, { message: 'That email is not registered' })

          bcrypt.compare(password, user.password, (err, isMac) => {
            if (err) throw err
            if (isMac) {
              return done(null, user)
            } else {
              done(null, false, { message: 'Email or Password incorrect' })
            }
          })
        })
      }
    )
  )

  passport.use(
    new FacebookStrategy(
      {
        clientID: '275276040026540',
        clientSecret: '2ecb44451c1cdba5256ad422ed22c7dc',
        callbackURL: 'http://localhost:3000/auth/facebook/callback',
        profileFields: ['email', 'displayName']
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ email: profile._json.email }).then(user => {
          if (!user) {
            const randomPassword = Math.random()
              .toString(36)
              .slice(-8)

            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(randomPassword, salt, (err, hash) => {
                const { email, name } = profile._json
                const newUser = new User({ email, name, password: hash })
                newUser
                  .save()
                  .then(user => {
                    return done(null, user)
                  })
                  .catch(err => console.log(err))
              })
            })
          } else {
            return done(null, user)
          }
        })
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })
}
