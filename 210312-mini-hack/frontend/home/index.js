const $deckSelectionGroup = $('input[name="current-deck"]')
const $cardBody = $("#card-body")
let currentCard
let cardState = "front"

const loadCard = async () => {
  $cardBody.html(`
  <div class="d-flex justify-content-center">
    <div class="spinner-border"/>
  </div>`)
  const $deckSelection = $('input[name="current-deck"]:checked')
  const deckParams = $deckSelection.val()

  const cardData = await $.ajax({
    url: `/api/cards/${deckParams}`,
    type: "GET",
  })
  $cardBody.html(`
  <div class="card-title" id="card-question">${cardData.front}</div>

  <div class="d-flex justify-content-around">
    <button class="btn btn-primary" id="flip-btn">Flip card</button>
    <a href="/edit/${cardData._id}">
      <button class="btn btn-warning" id="flip-btn">Edit card</button>
    </a>
    <div id="completed-btn-container">
    ${
      cardData.completed
        ? `<button class="btn btn-success" id="completed-btn">Learned!</button>`
        : `<button class="btn btn-danger" id="completed-btn">Not learned</button>`
    }
    </div>
    <button class="btn btn-primary" id="next-btn">Next card</button>
  </div>
  `)

  $("#flip-btn").on("click", flipCard)
  $("#next-btn").on("click", loadCard)
  $("#completed-btn").on("click", flipCompleted)

  currentCard = cardData
}

const flipCard = () => {
  switch (cardState) {
    case "front": {
      $("#card-question").html(currentCard.back)
      cardState = "back"
      return
    }
    case "back": {
      $("#card-question").html(currentCard.front)
      cardState = "front"
      return
    }
  }
}

const flipCompleted = async () => {
  console.log("flipped!")
  console.log(currentCard.completed)
  const bodyData = { completed: !currentCard.completed }

  try {
    const cardData = await $.ajax({
      url: `/api/cards/edit/${currentCard._id}`,
      type: "PUT",
      contentType: "application/json;charset=utf-8",
      data: JSON.stringify(bodyData),
    })

    if (cardData.completed) {
      $("#completed-btn-container").html(
        `<button class="btn btn-success" id="completed-btn">Learned!</button>`
      )
    } else {
      $("#completed-btn-container").html(
        `<button class="btn btn-danger" id="completed-btn">Not learned</button>`
      )
    }

    currentCard = cardData

    $("#completed-btn").on("click", flipCompleted)
  } catch (err) {
    console.error(err)
  }
}

$deckSelectionGroup.on("click", async () => {
  loadCard()
})

$(document).ready(async () => {
  loadCard()
})
