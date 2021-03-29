import { Request, Response } from "express"
import User from "./user"
import createError from "http-errors"

// POST /api/auth/signup
const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw new createError.BadRequest(
        `User with email ${email} already exists.`
      )
    }

    const newUser = await User.create({ email, password })
    res.send({ success: 1, user: newUser })
  } catch (err) {
    res.status(err.status || 500).send({ success: 0, message: err.message })
  }
}

// POST /api/auth/login
const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const matchingUser = await User.findOne({ email })
    if (!matchingUser) {
      throw new createError.BadRequest("Wrong email/password combination.")
    }

    const isPasswordMatch = matchingUser.checkPassword(password)
    if (!isPasswordMatch) {
      throw new createError.BadRequest("Wrong email/password combination.")
    }

    res.send({ success: 1, user: matchingUser })
  } catch (err) {
    res.status(err.status || 500).send({ success: 0, message: err.message })
  }
}

export { createUser, loginUser }
