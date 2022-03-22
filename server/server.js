const express = require('express')
const connectDB = require('./config/db')
require('dotenv').config()

const server = express()
const { json, urlencoded } = express
const port = process.env.PORT | 8000

connectDB()

server.use(json())
server.use(urlencoded({ extended: false}))

server.get('/', (req, res) => 
  res.send("OK")
)

module.exports = server.listen(port, () => console.log(`server started on port: ${port}`))