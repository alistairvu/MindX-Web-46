const $editForm = $("#edit-form")
const $frontField = $("#edit-form-front")
const $backField = $("#edit-form-back")
const $deckField = $("#edit-form-deck")
const cardId = window.location.pathname.split("/")[2]

const loadCard = async () => {
  const cardData = await $.ajax({
    url: `/api/cards/details/${cardId}`,
    type: "GET",
  })

  $frontField.val(cardData.front)
  $backField.val(cardData.back)
  $deckField.val(cardData.deck.name)
}

const editCard = async (e) => {
  e.preventDefault()
  const front = $frontField.val()
  const back = $backField.val()
  const deck = $deckField.val()

  const bodyData = {
    front: front,
    back: back,
    deck: deck,
  }

  try {
    const { data } = await $.ajax({
      url: `/api/cards/edit/${cardId}`,
      type: "PUT",
      contentType: "application/json;charset=utf-8",
      data: JSON.stringify(bodyData),
    })

    $("#confirm-success").html(`
    <div class="alert alert-success" role="alert">
      Card edited!
    </div>`)
    console.log(data)
  } catch (err) {
    console.error(err)
    $("#confirm-success").html(`
  <div class="alert alert-danger" role="alert">
    An error occurred, please try again.
  </div>`)
  }
}

$editForm.on("submit", editCard)

$(document).ready(() => {
  loadCard()
})
