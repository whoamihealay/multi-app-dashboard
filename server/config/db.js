const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === 'production') {
      db = await mongoose.connect(process.env.DATABASE_URI, {dbName: process.env.DATABASE_NAME})
    } else {
      db = await mongoose.connect(process.env.DATABASE_DEV_URI, {dbName: process.env.DATABASE_DEV_NAME})
    }
    console.log(
      `Database connection established: ${db.connection.host} - ${process.env.NODE_ENV}`
    )
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB
