import mongoose from "mongoose"
// import Card from "./cardModel"
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
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

deckSchema.virtual("cards", {
  ref: "Card",
  localField: "_id",
  foreignField: "deck",
})

const Deck = mongoose.model<DeckSchema>("Deck", deckSchema)

export default Deck
