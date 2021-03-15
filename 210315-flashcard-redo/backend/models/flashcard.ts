import mongoose from "mongoose"

interface FlashcardSchema extends mongoose.Document {
  frontSize: string
  backSide: string
  category: "code" | "vocal" | "other"
  isRemember: boolean
}

const schema = new mongoose.Schema({
  frontSide: {
    type: String,
    required: true,
  },
  backSide: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["code", "vocal", "other"],
    default: "other",
  },
  isRemember: {
    type: Boolean,
    default: false,
  },
})

export default mongoose.model<FlashcardSchema>("Flashcard", schema)
