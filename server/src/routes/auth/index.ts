import express from 'express'

import {
  registerUser,
  loginUser,
  getUser
} from '../../controllers/userController'
import { protect } from '../../middleware/authMiddleware'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/user', protect, getUser)

module.exports = router
