const initDb = () => {
  const mongoose = require('mongoose')
  const url = 'mongodb://127.0.0.1:27017/simple-message'
  mongoose.connect(url, { useNewUrlParser: true })

  const db = mongoose.connection
  db.once('open', _ => {
    console.log('Database connected:', url)
  })

  db.on('error', err => {
    console.error('connection error:', err)
  })

  return db
}

exports = module.exports = initDb;
