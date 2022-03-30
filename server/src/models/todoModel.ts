import mongoose, { Schema, model } from 'mongoose'
import { Todo } from '../interfaces'

const todoSchema = new Schema<Todo>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    text: {
      type: String,
      required: [true, 'Please add a text value']
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Todo', todoSchema)
const Todo = model<Todo>('Todo', todoSchema)

export default Todo
