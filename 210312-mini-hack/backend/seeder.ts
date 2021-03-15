import dotenv from "dotenv"
import Deck from "./models/deckModel"
import Card from "./models/cardModel"
import connectDB from "./db"

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Deck.deleteMany()
    await Card.deleteMany()

    const codeDeck = await Deck.create({ name: "code" })
    const englishDeck = await Deck.create({ name: "english" })

    await Card.create({
      front: "Bonjour",
      back: "Hello",
      deck: englishDeck._id,
    })

    await Card.create({
      front: "useState",
      back: "Hook",
      deck: codeDeck._id,
    })

    console.log("Data Imported!")
    process.exit()
  } catch (error) {
    console.error(error)
  }
}

const destroyData = async () => {
  try {
    await Deck.deleteMany()
    await Card.deleteMany()
    console.log("Data Destroyed!")
    process.exit()
  } catch (error) {
    console.error(error)
  }
}

if (process.argv[2] === "-d") {
  destroyData()
} else {
  importData()
}
