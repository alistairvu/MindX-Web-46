exports.loadQuestion = exports.loadMain = exports.loadAsk = void 0
const path = require("path")
// @desc    Load main page
// @param   GET /
const loadMain = (request, response) => {
  response.sendFile(path.resolve(__dirname, "../../public/main/index.html"))
}
exports.loadMain = loadMain
// @desc    Load ask page
// @param   GET /ask
const loadAsk = (request, response) => {
  response.sendFile(path.resolve(__dirname, "../../public/ask/index.html"))
}
exports.loadAsk = loadAsk
// @desc    Load question page
// @param   GET /question/:id
const loadQuestion = (request, response) => {
  response.sendFile(path.resolve(__dirname, "../../public/question/index.html"))
}
exports.loadQuestion = loadQuestion
