import { showID, showMagic } from "./controllers/methods"
const express = require("express")
const path = require("path")
const app = express()
const port: number = 6960

app.use(express.static(path.join(__dirname, "/public")))
app.get("/", showMagic).get("/:id", showID)

app.listen(port, (err: any) => {
  if (err) throw err
  console.log(`Experience the magic at http://localhost:${port}`)
})
