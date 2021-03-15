import express from "express"
import path from "path"
import mongoose from "mongoose"
import Flashcard from "./models/flashcard"

mongoose.connect(
  "mongodb://localhost:27017/flashcards-redo",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.log("MongoDB connect error")
    return console.log("MongoDB connected")
  }
)

const app = express()
const port = 6960

app.use(express.static(path.resolve(__dirname, "../frontend")))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/api/flashcards/random", async (req, res) => {
  try {
    const { category } = req.query
    let randomCards = []

    if (category == "all") {
      randomCards = await Flashcard.aggregate().sample(1)
    } else {
      randomCards = await Flashcard.aggregate().match({ category }).sample(1)
    }

    if (randomCards.length == 0) {
      return res.send({ success: 0 })
    }

    res.send({ success: 1, data: randomCards[0] })
  } catch (err) {
    console.log(err)
    res.status(500).send({ success: 0 })
  }
})

app.post("/api/flashcards", async (req, res) => {
  const { frontSide, backSide, category } = req.body
  try {
    const newCard = await Flashcard.create({ frontSide, backSide, category })
    res.send({ success: 1, data: newCard })
  } catch (err) {
    res.status(500).send({ success: 0 })
  }
})

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/html/home.html"))
})

app.get("/create", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/html/create.html"))
})

app.listen(port, () => {
  console.log(`Server started at ${port}`)
})
