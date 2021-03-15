import mongoose from "mongoose"
import Card from "./cardModel"
interface DeckSchema extends mongoose.Document {
  name: string
  cards: () => Promise<any[]>
}

const deckSchema = new mongoose.Schema<DeckSchema>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

deckSchema.methods.cards = async function (this: DeckSchema) {
  const cards = await Card.find({ deck: this._id })
  console.log(cards)
  return cards
}

// deckSchema.virtual("cards").get(async function (this: DeckSchema) {
//   const cards = await Card.find({ deck: this._id })
//   return cards
// })

const Deck = mongoose.model<DeckSchema>("Deck", deckSchema)

export default Deck
