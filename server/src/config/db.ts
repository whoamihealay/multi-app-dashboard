import mongoose from 'mongoose'
import { exit } from 'process'

const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URI) {
      await mongoose.connect(process.env.DATABASE_URI, {
        dbName: process.env.DATABASE_NAME
      })
    } else if (process.env.DATABASE_DEV_URI) {
      await mongoose.connect(process.env.DATABASE_DEV_URI, {
        dbName: process.env.DATABASE_DEV_NAME
      })
    } else {
      console.log('Database environment variables missing.')
      exit(1)
    }
    console.log(
      `Database connection established: ${mongoose.connection.host} - ${process.env.NODE_ENV}`
    )
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

export default connectDB
