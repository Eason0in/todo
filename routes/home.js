// routes/home.js
const express = require('express')
const router = express.Router()
const Todo = require('../models/todo')
//首頁
router.get('/', (req, res) => {
  Todo.find()
    .sort({ name: 1 })
    .exec((err, todos) => {
      if (err) return console.log(err)
      return res.render('index', { todos })
    })
})
module.exports = router
