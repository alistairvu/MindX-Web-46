import { showID, showAskForm, addQuestion } from "./controllers/methods"
const express = require("express")
const app = express()
const port: number = 6960

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))

app.get("/", showAskForm).get("/:id", showID).post("/add-question", addQuestion)

app.listen(port, (err: any) => {
  if (err) throw err
  console.log(`Experience the magic at http://localhost:${port}`)
})
