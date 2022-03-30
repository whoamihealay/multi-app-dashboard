import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import connectDB from './config/db'
import { errorHandler } from './middleware/errorMiddleware'
import 'dotenv/config'

const server: Application = express()
const { json, urlencoded } = express
const port = process.env.PORT || 8000

connectDB()

server.use(json())
server.use(urlencoded({ extended: false }))
server.use(cors())

server.use('/auth', require('./routes/auth'))

server.get('/health', (req: Request, res: Response): void => {
  res.send('OK')
})

server.use(errorHandler)

module.exports = server.listen(port, (): void =>
  console.log(`server started on port: ${port}`)
)
