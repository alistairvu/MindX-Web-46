import mongoose from "mongoose"

interface DeckSchema extends mongoose.Document {
  name: string
  cards: mongoose.Schema.Types.ObjectId[]
}

const deckSchema = new mongoose.Schema<DeckSchema>(
  {
    name: {
      type: String,
      required: true,
    },
    cards: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Card",
      },
    ],
  },
  { timestamps: true }
)

const Deck = mongoose.model<DeckSchema>("Deck", deckSchema)

export default Deck
