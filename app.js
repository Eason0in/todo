const express = require('express')
const app = express()
const mongoose = require('mongoose')

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
  res.send('Hi')
})

//列出全部Todo
app.get('/todos', (req, res) => {
  res.send('列出所有Todo')
})

//新增一筆Todo頁面
app.get('/todos/new', (req, res) => {
  res.send('新增Todo頁面')
})

//顯示一筆Todo的詳細內容
app.get('/todos/:id', (req, res) => {
  res.send('顯示Todo的詳細內容')
})

//新增一筆Todo
app.post('/todos', (req, res) => {
  res.send('建立Todo')
})

//修改Todo頁面
app.get('/todos/:id/edit', (req, res) => {
  res.send('修改Todo 頁面')
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
