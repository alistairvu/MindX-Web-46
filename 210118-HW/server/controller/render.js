const path = require("path")
// @desc    Load main page
// @param   GET /
const loadMain = (request, response) => {
  response.sendFile(path.resolve(__dirname, "../../public/main/index.html"))
}
// @desc    Load ask page
// @param   GET /ask
const loadAsk = (request, response) => {
  response.sendFile(path.resolve(__dirname, "../../public/ask/index.html"))
}

module.exports = { loadAsk, loadMain }
