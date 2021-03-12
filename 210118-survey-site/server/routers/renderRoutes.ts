import {
  loadMain,
  loadAsk,
  loadQuestion,
  loadTeapot,
  loadSearch,
} from "../controllers/render"
import express from "express"

const router = express.Router()

router.route("/").get(loadMain)
router.route("/ask").get(loadAsk)
router.route("/search").get(loadSearch)
router.route("/question/:id").get(loadQuestion)
router.route("/teapot").get(loadTeapot)

export default router
