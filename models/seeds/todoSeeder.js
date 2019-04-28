const mongoose = require('mongoose')
const Todo = require('../todo.js')
const db = mongoose.connection

// mongoose.connect('mongodb://127.0.0.1/todo', { useNewUrlParser: true })

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/todo', {
  useNewUrlParser: true,
  useCreateIndex: true
})

db.on('error', () => {
  console.log('db is error')
})

db.once('open', () => {
  console.log('db is connected!')
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: 'name-' + i })
  }
  console.log('done')
})
