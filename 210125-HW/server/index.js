"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
const methods = require("./controller/methods")
const render_1 = require("./controller/render")
const express = require("express")
const path = require("path")
const app = express()
const port = 6960
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))
app.use(express.static(path.join(__dirname, "../public")))
app.get("/", render_1.loadMain)
app.get("/ask", render_1.loadAsk)
app.get("/question/:id", render_1.loadQuestion)
app.get("/api/get-question", methods.getRandomQuestion)
app.get("/api/get-question/:id", methods.getQuestionById)
app.post("/api/add-question", methods.addQuestion)
app.put("/api/add-vote", methods.addVote)
app.listen(port, (err) => {
  if (err) throw err
  console.log(`Experience the magic at http://localhost:${port}`)
})
