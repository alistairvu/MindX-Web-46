exports.getQuestionById = exports.addVote = exports.addQuestion = exports.getRandomQuestion = void 0
const { v4: uuidv4 } = require("uuid")
const path = require("path")
const fs = require("fs")
// @desc    Get one question from the pool of questions
// @param   GET /api/get-question
const getRandomQuestion = (request, response) => {
  const data = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "./data.json"))
  )
  const index = Math.floor(Math.random() * data.length)
  const question = data[index]
  response.send({
    success: true,
    data: question,
  })
}
exports.getRandomQuestion = getRandomQuestion
// @desc    Get one question from the pool of questions
// @param   GET /api/get-question/:id
const getQuestionById = (request, response) => {
  const data = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "./data.json"))
  )
  const { id } = request.params
  const question = data.find((question) => question._id === id)
  if (question) {
    response.send({
      success: true,
      data: question,
    })
  } else {
    response.status(404)
    response.send({
      success: false,
      message: "Question not found",
    })
  }
}
exports.getQuestionById = getQuestionById
// @desc    Add a question to the pool of questions
// @param   POST /api/add-question
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
    response.send({
      success: true,
      data: newQuestion,
    })
  }
}
exports.addQuestion = addQuestion
// @desc    Add a vote
// @param   PUT /api/add-vote
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
    const newData = data.map((question) => {
      if (question._id === _id && (vote === "up" || vote === "down")) {
        return Object.assign(Object.assign({}, question), {
          [`${vote}Vote`]: question[`${vote}Vote`] + 1,
        })
      }
      return question
    })
    fs.writeFileSync(
      path.resolve(__dirname, "./data.json"),
      JSON.stringify(newData)
    )
    response.send({
      success: true,
      data: newData.find((x) => x._id === _id),
    })
  }
}
exports.addVote = addVote
