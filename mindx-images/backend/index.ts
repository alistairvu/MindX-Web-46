import express from "express"
import dotenv from "dotenv"
import connectDB from "./db"

import authRouter from "./modules/auth/auth.router"
import postRouter from "./modules/post/post.router"
import commentRouter from "./modules/comment/comment.router"

dotenv.config()
connectDB()

const app = express()
const port = process.env.PORT || 6960

app.use(express.json())

app.use("/api/auth", authRouter)
app.use("/api/posts", postRouter)
app.use("/api/comments", commentRouter)

app.listen(port, () => {
  console.log("Listening on port 6960")
})
