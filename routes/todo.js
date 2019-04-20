const express = require('express')
const router = express.Router()
const Todo = require('../models/todo.js')
const { authenticated } = require('../config/auth')

//列出全部Todo
router.get('/', authenticated, (req, res) => {
  res.send('列出所有Todo')
})

//新增一筆Todo頁面
router.get('/new', authenticated, (req, res) => {
  res.render('new')
})

//顯示一筆Todo的詳細內容
router.get('/:id', authenticated, (req, res) => {
  Todo.findOne({ _id: req.params.id, userId: req.user._id }, (err, todo) => {
    res.render('detail', { todo })
  })
})

//修改Todo頁面
router.get('/:id/edit', authenticated, (req, res) => {
  Todo.findOne({ _id: req.params.id, userId: req.user._id }, (err, todo) => {
    if (err) return console.log(err)
    res.render('edit', { todo })
  })
})

//POST
//新增一筆Todo
router.post('/', authenticated, (req, res) => {
  const todo = Todo({
    name: req.body.name,
    userId: req.user._id
  })

  todo.save(err => {
    if (err) return console.log(err)
    res.redirect('/')
  })
})

//修改Todo
router.put('/:id', authenticated, (req, res) => {
  Todo.findOne({ _id: req.params.id, userId: req.user._id }, (err, todo) => {
    if (err) return console.log(err)
    todo.name = req.body.name
    if (req.body.done === 'on') {
      todo.done = true
    } else {
      todo.done = false
    }

    todo.save(err => {
      if (err) return console.log(err)
      res.redirect(`/todos/${req.params.id}`)
    })
  })
})

//刪除Todo
router.delete('/:id/delete', authenticated, (req, res) => {
  Todo.findOne({ _id: req.params.id, userId: req.user._id }, (err, todo) => {
    if (err) return console.log(err)
    todo.remove(error => {
      if (error) return console.log(error)
      res.redirect('/')
    })
  })
})
module.exports = router
