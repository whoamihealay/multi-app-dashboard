import asyncHandler from 'express-async-handler'
import Todo from '../models/todoModel'

// @desc    Get todos from DB
// @route GET /api/todos/
// @access Private
const getTodos = asyncHandler(async (req, res, next) => {
  try {
    const todos = await Todo.find({ user: req.body.user.id })

    res.status(200).json(todos)
  } catch (error) {
    next(error)
  }
})

// @desc    post new Todo
// @route   POST /api/todos
// @access  Private
const postTodo = asyncHandler(async (req, res, next) => {
  try {
    if (!req.body.text) {
      res.status(400)
      throw new Error('Please add a text field')
    }

    const todo = await Todo.create({
      text: req.body.text,
      user: req.body.user.id
    })

    res.status(200).json(todo)
  } catch (error) {
    next(error)
  }
})

// @desc    Update Todo
// @route   PUT /api/todos
// @access  Private
const updateTodo = asyncHandler(async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id)

    if (!todo) {
      res.status(400)
      throw new Error('Todo not found')
    }

    if (!req.body.user) {
      res.status(401)
      throw new Error('User not found')
    }

    if (todo.user.toString() != req.body.user.id) {
      res.status(401)
      throw new Error('User not authorized')
    }

    const updatedTodo = await Todo.findOneAndUpdate(
      req.body.user.id,
      req.body,
      {
        new: true
      }
    )

    res.status(200).json(updatedTodo)
  } catch (error) {
    next(error)
  }
})

// @desc    Delete Todo
// @route   DELETE /api/todos
// @access  Private
const deleteTodo = asyncHandler(async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id)

    if (!todo) {
      res.status(400)
      throw new Error('Todo not found')
    }

    // Check for user
    if (!req.body.user) {
      res.status(401)
      throw new Error('User not found')
    }

    await todo.deleteOne()

    res.status(200).json({ id: req.params.id })
  } catch (error) {
    next(error)
  }
})

export { getTodos, postTodo, updateTodo, deleteTodo }
