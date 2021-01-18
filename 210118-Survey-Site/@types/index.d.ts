declare module "../controllers/methods.ts"

export interface Question {
  _id: string
  content: string
  upVote: number
  downVote: number
}
