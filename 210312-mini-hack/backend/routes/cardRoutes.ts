import express from "express"
import {
  createCard,
  getCard,
  getDetails,
  updateCard,
} from "../controller/cardController"

const router = express.Router()

router.route("/").post(createCard).get(getCard)
router.route("/details/:id").get(getDetails)
router.route("/edit/:id").put(updateCard)
router.route("/:deck").get(getCard)

export default router
