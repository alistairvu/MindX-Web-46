import { Request, Response } from "express"
import User from "./user"

// POST /api/auth/signup
const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw new Error(`User with email ${email} already exists.`)
    }

    const newUser = await User.create({ email, password })
    res.send({ success: true, user: newUser })
  } catch (err) {
    res.status(500).send({ success: 0, message: err.message })
  }
}

export { createUser }
