import express from "express"
import { addVote } from "../controllers/methods"

const router = express.Router()

router.route("/").put(addVote)

export default router
