const express = require('express')
const router = express.Router()

//登入頁面
router.get('/login', (req, res) => {
  res.send('get login')
})

//登入檢查
router.post('/login', (req, res) => {
  res.send('post login')
})

//註冊頁面
router.get('/register', (req, res) => {
  res.send('get register')
})

//註冊檢查
router.post('/register', (req, res) => {
  res.send('post register')
})

//登出
router.get('/logout', (req, res) => {
  res.send('get logout')
})

module.exports = router
