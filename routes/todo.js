const express = require('express')
const router = express.Router()
const Todo = require('../models/todo.js')

//列出全部Todo
router.get('/', (req, res) => {
  res.send('列出所有Todo')
})

//新增一筆Todo頁面
router.get('/new', (req, res) => {
  res.render('new')
})

//顯示一筆Todo的詳細內容
router.get('/:id', (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    res.render('detail', { todo })
  })
})

//修改Todo頁面
router.get('/:id/edit', (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.log(err)
    res.render('edit', { todo })
  })
})

//POST
//新增一筆Todo
router.post('/', (req, res) => {
  const todo = Todo({
    name: req.body.name
  })

  todo.save(err => {
    if (err) return console.log(err)
    res.redirect('/')
  })
})

//修改Todo
router.put('/:id', (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
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
router.delete('/:id/delete', (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.log(err)
    todo.remove(error => {
      if (error) return console.log(error)
      res.redirect('/')
    })
  })
})
module.exports = router
