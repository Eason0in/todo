const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

const Todo = require('./models/todo.js')
const port = 3000

mongoose.connect('mongodb://127.0.0.1/todo', { useNewUrlParser: true })
const db = mongoose.connection

//連線異常
db.on('error', () => {
  console.log('mongodb error!')
})

//連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

//首頁
app.get('/', (req, res) => {
  Todo.find((err, todos) => {
    if (err) return console.log(err)
    return res.render('index', { todos })
  })
})

//列出全部Todo
app.get('/todos', (req, res) => {
  res.send('列出所有Todo')
})

//新增一筆Todo頁面
app.get('/todos/new', (req, res) => {
  res.render('new')
})

//顯示一筆Todo的詳細內容
app.get('/todos/:id', (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    res.render('detail', { todo })
  })
})

//修改Todo頁面
app.get('/todos/:id/edit', (req, res) => {
  res.send('修改Todo 頁面')
})

//POST
//新增一筆Todo
app.post('/todos', (req, res) => {
  const todo = Todo({
    name: req.body.name
  })

  todo.save(err => {
    if (err) return console.log(err)
    res.redirect('/')
  })
})

//修改Todo
app.post('/todos/:id', (req, res) => {
  res.send('修改Todo')
})

//刪除Todo
app.post('/todos/:id/delete', (req, res) => {
  res.send('刪除Todo')
})

app.listen(port, () => {
  console.log(`App is running in http://localhost:${port}.`)
})
