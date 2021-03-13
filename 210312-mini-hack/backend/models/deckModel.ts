import mongoose from "mongoose"

interface DeckSchema extends mongoose.Document {
  name: string
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

const Deck = mongoose.model<DeckSchema>("Deck", deckSchema)

export default Deck
