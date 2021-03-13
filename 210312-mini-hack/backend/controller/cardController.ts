import asyncHandler from "express-async-handler"
import Card from "../models/cardModel"
import Deck from "../models/deckModel"

// @desc    Create a new card
// @param   POST /api/cards
export const createCard = asyncHandler(async (req, res, next) => {
  const { front, back, deck } = req.body

  if (!front || !back || !deck) {
    return res.status(422).send({ message: "Not enough data" })
  }

  const matchingDeck = await Deck.findOne({ name: deck })

  if (!matchingDeck) {
    return res.status(404).send({ message: "Deck not found" })
  }

  const newCard = await Card.create({
    front: front,
    back: back,
    completed: false,
    deck: matchingDeck._id,
  })

  res.send(newCard)
})

// @desc    Get card detail
// @param   GET /api/cards/details/:id
export const getDetails = asyncHandler(async (req, res, next) => {
  const card = await Card.findById(req.params.id).populate("deck", "name")
  res.send(card)
})

// @desc    Get random card from a certain deck
// @param   GET /api/cards/:deck
export const getCard = asyncHandler(async (req, res, next) => {
  const { deck } = req.params

  if (deck) {
    const matchingDeck = await Deck.findOne({ name: deck })

    if (!matchingDeck) {
      return res.status(404).send({ message: "Deck not found" })
    }

    const cards = await Card.aggregate([
      { $match: { deck: matchingDeck._id } },
      { $sample: { size: 1 } },
    ])
    const card = cards[0]

    res.send(card)
  } else {
    const cards = await Card.aggregate([{ $sample: { size: 1 } }])
    const card = cards[0]

    res.send(card)
  }
})

// @desc    Edit a pre-existing card
// @param   PATCH /api/cards/:id
export const updateCard = asyncHandler(async (req, res, next) => {
  console.log(req.body)
  const { front, back, deck, completed } = req.body

  if (!front && !back && !deck && completed === undefined) {
    return res.status(422).send({ message: "Not enough data" })
  }

  let matchingDeck

  if (deck) {
    matchingDeck = await Deck.findOne({ name: deck })

    if (!matchingDeck) {
      return res.status(404).send({ message: "Deck not found" })
    }
  }

  const newData: any = {}

  if (front) {
    newData.front = front
  }
  if (back) {
    newData.back = back
  }
  if (deck && matchingDeck) {
    newData.deck = matchingDeck._id
  }
  if (completed !== undefined) {
    newData.completed = completed
  }

  const updatedCard = await Card.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    upsert: true,
  })

  res.send(updatedCard)
})
