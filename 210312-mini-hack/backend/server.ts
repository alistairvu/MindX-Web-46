import express from "express"
import path from "path"
import dotenv from "dotenv"
import connectDB from "./db"
import renderRouter from "./routes/renderRoutes"
import deckRouter from "./routes/deckRoutes"
import cardRouter from "./routes/cardRoutes"

dotenv.config()

const app = express()
const port = process.env.PORT || 6960

connectDB()

app.use(express.json())
app.use(express.static(path.join(__dirname, "../frontend")))

app.use("/api/cards", cardRouter)
app.use("/api/decks", deckRouter)
app.use("/", renderRouter)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
