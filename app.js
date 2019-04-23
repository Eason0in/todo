const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({ secret: 'ddd111', resave: false, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(passport)
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  next()
})

const Todo = require('./models/todo.js')
const port = 3000

mongoose.connect('mongodb://127.0.0.1/todo', { useNewUrlParser: true, useCreateIndex: true })
const db = mongoose.connection

//連線異常
db.on('error', () => {
  console.log('mongodb error!')
})

//連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.use('/', require('./routes/home'))
app.use('/todos', require('./routes/todo'))
app.use('/users', require('./routes/user'))

app.listen(port, () => {
  console.log(`App is running in http://localhost:${port}.`)
})
