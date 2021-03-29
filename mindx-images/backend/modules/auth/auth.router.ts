import express from "express"
import { createUser } from "./auth.controller"

const router = express.Router()

// api/auth/signup
router.route("/signup").post(createUser)
router.route("/login")

export default router
