import express from "express"
import dotenv from "dotenv"
import connectDB from "./db"

dotenv.config()
connectDB()

const app = express()
const port = process.env.PORT || 6960

app.use(express.json())

app.listen(port, () => {
  console.log("Listening on port 6960")
})
