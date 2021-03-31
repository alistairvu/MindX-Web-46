import express from "express"
import dotenv from "dotenv"
import connectDB from "./db"
import cookieParser from "cookie-parser"

import authRouter from "./modules/auth/auth.router"
import postRouter from "./modules/post/post.router"
import commentRouter from "./modules/comment/comment.router"

dotenv.config()
connectDB()

const app = express()
const port = process.env.PORT || 6960

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use("/api/posts", postRouter)
app.use("/api/comments", commentRouter)

app.use("*", (req, res) =>
  res.status(404).send({ success: 0, message: "Route not found" })
)

// app.use((err: any, req: express.Request, res: express.Response, next: any) => {
//   res.status(err.status || 500).send({ success: 0, message: err.message })
// })

app.listen(port, () => {
  console.log("Listening on port 6960")
})
