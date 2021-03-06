import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel'

interface DataStoredInToken {
  id: string
}

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token

    if (req.headers['x-access-token']) {
      try {
        token = req.headers['x-access-token'] as string

        if (token && process.env.JWT_SECRET) {
          const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
          ) as DataStoredInToken
          const user = await User.findById(decoded.id).select('-password')

          if (!user) {
            res.status(401)
            throw new Error('User not found')
          }
          req.body.user = user
        }

        next()
      } catch (error) {
        console.log(error)
        res.status(401)
        throw new Error('Not Authorized')
      }
    }
    if (!token) {
      res.status(401)
      throw new Error('Not Authorized. Missing element.')
    }
  }
)

export { protect }
