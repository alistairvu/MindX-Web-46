import { getRandomQuestion, addQuestion, addVote } from "./controller/methods"
const express = require("express")

const app = express()
const port: number = 6960

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))

app.get("/get-question", getRandomQuestion)
app.post("/add-question", addQuestion)
app.put("/add-vote", addVote)

app.listen(port, (err: any) => {
  if (err) throw err
  console.log(`Experience the magic at http://localhost:${port}`)
})
