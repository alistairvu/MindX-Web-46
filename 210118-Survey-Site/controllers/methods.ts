const path = require("path")
// @desc    Show MAGIC on the screen
// @route   /
const showMagic = (request: any, response: any) => {
  response.status(200)
  response.sendFile(path.resolve(__dirname, "../public/index.html"))
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

export { showMagic, showID }
