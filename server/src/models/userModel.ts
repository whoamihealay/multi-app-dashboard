import { Schema, model } from 'mongoose'
import { User } from '../interfaces'

const userSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: [true, 'Please add a name'],
      unique: true
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minLength: 8
    }
  },
  {
    timestamps: true
  }
)

const User = model<User>('User', userSchema)

export default User
