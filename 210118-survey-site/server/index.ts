import { loadNotFound } from "./controllers/render"
import express, { Request, Response, NextFunction } from "express"
import path from "path"
import connectDB from "./db"
import dotenv from "dotenv"

import renderRouter from "./routers/renderRoutes"
import questionRouter from "./routers/questionRoutes"
import randomRouter from "./routers/randomRoutes"
import teapotRouter from "./routers/teapotRoutes"
import voteRouter from "./routers/voteRoutes"

dotenv.config()
connectDB()

const app = express()
const port: number = 6960

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))
app.use(express.static(path.join(__dirname, "../public")))

app.use("/", renderRouter)
app.use("/api/random", randomRouter)
app.use("/api/questions", questionRouter)
app.use("/api/vote", voteRouter)
app.use("/api/teapot", teapotRouter)

app.get("*", loadNotFound)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500)
  res.json({ success: false, message: err.message })
})

app.listen(port, () => {
  console.log(`Experience the magic at http://localhost:${port}`)
})
