import express from "express"
import { getAllDecks, getMatchingDeck } from "../controller/deckController"

const router = express.Router()

router.route("/").get(getAllDecks)
router.route("/:name").get(getMatchingDeck)

export default router
