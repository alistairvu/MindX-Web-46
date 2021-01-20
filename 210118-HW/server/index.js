const {
  getRandomQuestion,
  addQuestion,
  addVote,
} = require("./controller/methods.js")
const { loadMain, loadAsk } = require("./controller/render.js")
const path = require("path")

const express = require("express")
const app = express()
const port = 6960

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, "../public")))

app.get("/", loadMain)
app.get("/ask", loadAsk)
app.get("/get-question", getRandomQuestion)
app.post("/add-question", addQuestion)
app.put("/add-vote", addVote)

app.listen(port, (err) => {
  if (err) throw err
  console.log(`Experience the magic at http://localhost:${port}`)
})
