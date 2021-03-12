import express from "express"
import {
  addQuestion,
  getQuestionById,
  getAllQuestions,
  deleteQuestionById,
  getTopQuestion,
  searchQuestions,
} from "../controllers/methods"

const router = express.Router()

router.route("/").post(addQuestion).get(getAllQuestions)
router.route("/top").get(getTopQuestion)
router.route("/search").get(searchQuestions)
router.route("/:id").get(getQuestionById).delete(deleteQuestionById)

export default router
