const express = require('express')
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')
require('dotenv').config()

const server = express()
const { json, urlencoded } = express
const port = process.env.PORT | 8000

connectDB()

server.use(json())
server.use(urlencoded({ extended: false }))

server.use('/api/users', require('./routes/users/auth'))

server.get('/', (req, res) => res.send('OK'))

server.use(errorHandler)

module.exports = server.listen(port, () =>
  console.log(`server started on port: ${port}`)
)
