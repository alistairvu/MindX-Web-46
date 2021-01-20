const { v4: uuidv4 } = require("uuid")
const path = require("path")
const fs = require("fs")

// @desc    Get one question from the pool of questions
// @param   GET /get-question
const getRandomQuestion = (request, response) => {
  const data = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "./data.json"))
  )
  const index = Math.floor(Math.random() * data.length)
  const question = data[index]
  response.status(200)
  response.send({
    success: true,
    data: question,
  })
}

// @desc    Add a question to the pool of questions
// @param   POST /add-question
const addQuestion = (request, response) => {
  const data = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "./data.json"))
  )
  const { content } = request.body
  if (!content) {
    response.status(400)
    response.send({
      success: false,
      message: "Invalid request",
    })
  } else {
    const newQuestion = {
      _id: uuidv4(),
      content: content,
      upVote: 0,
      downVote: 0,
    }
    const newData = [...data, newQuestion]
    fs.writeFileSync(
      path.resolve(__dirname, "./data.json"),
      JSON.stringify(newData)
    )
    response.status(200)
    response.send({
      success: true,
      data: newQuestion,
    })
  }
}

// @desc    Add a vote
// @param   PUT /add-vote
const addVote = (request, response) => {
  const data = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "./data.json"))
  )
  const voteReq = request.body
  if (!voteReq) {
    response.status(403)
    response.send({
      success: false,
      message: "Invalid request",
    })
  } else {
    const { _id, vote } = voteReq
    const question = data.find((x) => x._id === _id)
    let newQuestion
    switch (vote) {
      case "up":
        newQuestion = Object.assign(Object.assign({}, question), {
          upVote: question.upVote + 1,
        })
        break
      case "down":
        newQuestion = Object.assign(Object.assign({}, question), {
          downVote: question.downVote + 1,
        })
        break
      default:
        newQuestion = question
        break
    }
    const newData = data.map((item) => {
      if (item._id === _id) {
        return newQuestion
      }
      return item
    })
    fs.writeFileSync(
      path.resolve(__dirname, "./data.json"),
      JSON.stringify(newData)
    )
    response.status(200)
    response.send({
      success: true,
      data: newQuestion,
    })
  }
}

module.exports = { getRandomQuestion, addQuestion, addVote }
