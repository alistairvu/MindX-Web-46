import asyncHandler from "express-async-handler"
import Card from "../models/cardModel"
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
  const deck = await Deck.findOne({ name: req.params.name })

  if (!deck) {
    return res.status(404).send({ message: "No matching deck found" })
  }

  const cards = await Card.find({ deck: deck._id })
  res.send(cards)
})
