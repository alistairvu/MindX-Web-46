import asyncHandler from "express-async-handler"
import Deck from "../models/deckModel"

// @desc    Get all decks
// @param   GET /api/decks
export const getAllDecks = asyncHandler(async (req, res, next) => {
  const decks = await Deck.find({})
  res.send(decks)
})

// @desc    Get deck with matching name
// @param   GET /api/decks/:name
export const getMatchingDeck = asyncHandler(async (req, res, next) => {
  const deck = await Deck.findOne({ name: req.params.name }).populate(
    "cards",
    "front back completed"
  )
  res.send(deck)
})
