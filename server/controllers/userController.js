const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

const tokenExpireTime = '30d'

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res, next) => {
  // Generate JWT
  const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: tokenExpireTime
    })
  }

  try {
    const { username, email, password } = req.body

    // Check that no fields are empty
    if (!username | !email | !password) {
      res.status(400)
      throw new Error('Please add all fields')
    }

    // Check if user is already register
    const isUser = await User.findOne({ username })

    if (isUser) {
      res.status(400)
      throw new Error('Username is taken')
    }

    // Check for password lenght (minimum 8)
    if (password.length < 8) {
      res.status(400)
      throw new Error('Password must be at least 8 characters')
    }

    // Password hash
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create User
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    })

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id)
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }

    
  } catch (error) {
    console.log(error)
  }

  
}

module.exports = {
  registerUser
}
