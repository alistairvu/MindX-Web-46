import mongoose from "mongoose"

export interface CardSchema extends mongoose.Document {
  front: string
  back: string
  completed: boolean
  deck: mongoose.Schema.Types.ObjectId
}

const cardSchema = new mongoose.Schema<CardSchema>(
  {
    front: {
      type: String,
      required: true,
    },
    back: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    deck: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Deck",
    },
  },
  { timestamps: true }
)

const Card = mongoose.model<CardSchema>("Card", cardSchema)

export default Card
