import express from "express"
import { getRandomQuestion } from "../controllers/methods"

const router = express.Router()

router.route("/").get(getRandomQuestion)

export default router
