import express from 'express'

import {
  getTodos,
  postTodo,
  updateTodo,
  deleteTodo
} from '../../controllers/todoContoller'
import { protect } from '../../middleware/authMiddleware'

const router = express.Router()

router.route('/').get(protect, getTodos).post(protect, postTodo)
router.route('/:id').put(protect, updateTodo).delete(protect, deleteTodo)

module.exports = router
