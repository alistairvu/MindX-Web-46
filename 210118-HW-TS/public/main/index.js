const container = document.getElementById("container")

const getQuestion = async () => {
  try {
    const res = await fetch("http://localhost:6960/get-question")
    const { data } = await res.json()
    const { _id, content } = data

    container.innerHTML = `<h3 id="question">${content}</h3>
  <div id="results">
    <button id="up-vote">UP</button>
    <button id="down-vote">DOWN</button>
  </div>`
    return _id
  } catch (error) {
    console.log(error)
  }
}

const getVote = async (type, id) => {
  try {
    const questionContent = document.getElementById("question").innerHTML
    const bodyData = { _id: id, vote: type }
    const res = await fetch("http://localhost:6960/add-vote", {
      method: "PUT",
      body: new URLSearchParams(bodyData),
    })
    const { data } = await res.json()

    const { upVote, downVote } = data
    container.innerHTML = `<p>Thank you for voting! The question "${questionContent}" has been upvoted ${upVote} ${
      upVote === 1 ? "time" : "times"
    } and downvoted ${downVote} ${downVote === 1 ? "time" : "times"}.</p>`
  } catch (error) {
    console.log(error)
  }
}

const showData = async () => {
  const id = await getQuestion()

  const upButton = document.getElementById("up-vote")
  const downButton = document.getElementById("down-vote")
  upButton.addEventListener("click", () => getVote("up", id))
  downButton.addEventListener("click", () => getVote("down", id))
}

showData()
