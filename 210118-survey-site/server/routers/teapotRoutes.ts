import express from "express"
import { teapot } from "../controllers/methods"

const router = express.Router()

router.route("/").get(teapot)

export default router
