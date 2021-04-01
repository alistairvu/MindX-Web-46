import { Response, Request } from "express"
import { RequestWithUser } from "../../middleware/auth.middleware"
import Post from "./post"
import HTTPError from "../../httpError"

// GET /api/posts
export const getPosts = async (req: Request, res: Response) => {
  try {
    const pageSize = 5
    const page = Number(req.query.page) || 1
    const offset = pageSize * (page - 1)
    const posts = await Post.find({}).limit(pageSize).skip(offset)

    const postCount = await Post.countDocuments()
    const pageCount = Math.ceil(postCount / pageSize)

    res.send({ success: 1, page: page, pageCount: pageCount, posts: posts })
  } catch (err) {
    res.status(err.status || 500).send({ success: 0, message: err.message })
  }
}

// GET /api/posts/:id
export const showPost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      throw new HTTPError("No matching posts found", 404)
    }

    res.send({ success: 1, post: post })
  } catch (err) {
    res.status(err.status || 500).send({ success: 0, message: err.message })
  }
}

// POST /api/post
export const createPost = async (req: RequestWithUser, res: Response) => {
  try {
    const { imageUrl, title, description } = req.body
    const createdBy = req.user._id
    const post = await Post.create({ imageUrl, title, description, createdBy })
    res.send({ success: 1, post: post })
  } catch (err) {
    res.status(err.status || 500).send({ success: 0, message: err.message })
  }
}

// DELETE /api/posts/:id
export const deletePost = async (req: RequestWithUser, res: Response) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id)

    if (!post) {
      throw new HTTPError("No matching posts found", 404)
    }

    if (post.createdBy.toString() !== req.user._id.toString()) {
      throw new HTTPError("Action not allowed", 401)
    }

    res.send({ success: 1, deleted: 1 })
  } catch (err) {
    res
      .status(err.status || 500)
      .send({ success: 0, deleted: 0, message: err.message })
  }
}
