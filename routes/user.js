const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

//登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

//登入檢查
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })(req, res, next)
})

//註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})

//註冊檢查
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  const errors = []

  if (!name || !email || !password || !password2) {
    errors.push({ message: '請填寫所有欄位' })
  }

  if (password !== password2) {
    errors.push({ message: '密碼欄位不一致' })
  }

  if (errors.length > 0) {
    res.render('register', { errors, name, email, password, password2 })
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        res.render('register', { name, email, password, password2 })
      } else {
        // const newUser = new User(req.body)  =>also work
        const newUser = new User({ name, email, password })

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash

            newUser
              .save()
              .then(() => {
                res.redirect('/')
              })
              .catch(err => {
                console.log(err)
              })
          })
        })
      }
    })
  }
})

//登出
router.get('/logout', (req, res) => {
  req.logOut()
  req.flash('success_msg', '登出成功')
  res.redirect('/users/login')
})

module.exports = router
