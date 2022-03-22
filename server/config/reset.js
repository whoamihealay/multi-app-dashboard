const mongoose = require('mongoose');
require('dotenv').config()

mongoose
  .connect(`${process.env.DATABASE_DEV_URI}/${process.env.DATABASE_DEV_NAME}`, {authSource: "admin"})
  .then(() => {
    console.log('Database connection open')
  })
  .catch((err) => {
    console.log(err);
  })

mongoose.connection.dropDatabase()
  .then(() => mongoose.connection.close())
  .then(() => console.log("Database connection closed"))
