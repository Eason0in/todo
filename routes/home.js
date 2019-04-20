// routes/home.js
const express = require('express')
const router = express.Router()
const Todo = require('../models/todo')
const { authenticated } = require('../config/auth')
//首頁
router.get('/', authenticated, (req, res) => {
  Todo.find({ userId: req.user._id })
    .sort({ name: 1 })
    .exec((err, todos) => {
      if (err) return console.log(err)
      return res.render('index', { todos })
    })
})
module.exports = router
