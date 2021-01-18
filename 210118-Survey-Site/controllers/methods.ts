import { Question } from "../@types"
const { v4: uuidv4 } = require("uuid")
const path = require("path")
const fs = require("fs")

// @desc    Show ask form on the screen
// @route   /
const showAskForm = (request: any, response: any) => {
  response.status(200)
  response.sendFile(path.resolve(__dirname, "../public/ask/index.html"))
}

// @desc    Show the ID on the screen if ID is a number
// @route   /:id
const showID = (request: { params: { id: string } }, response: any) => {
  const { id } = request.params
  if (isNaN(parseInt(id))) {
    response.status(400)
    response.send({
      success: false,
      message: "Sorry, invalid request",
    })
  } else {
    response.status(200)
    response.send({
      success: true,
      id: id,
    })
  }
}

// @desc    Add a question to the database
// @route   /ask
const addQuestion = (request: any, response: any) => {
  const data: Array<Question> = require("../data.json")
  const { content } = request.body

  if (content === undefined) {
    response.status(400)
    response.send({
      success: false,
      message: "Invalid request",
    })
  } else {
    const question: Question = {
      _id: uuidv4(),
      content: content,
      upVote: 0,
      downVote: 0,
    }
    const newData = [...data, question]
    fs.writeFileSync("./data.json", JSON.stringify(newData))

    response.status(200)
    response.send({
      success: true,
      question: question,
    })
  }
}

export { showAskForm, showID, addQuestion }
