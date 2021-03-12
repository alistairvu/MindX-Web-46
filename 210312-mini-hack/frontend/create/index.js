$("#create-form").on("submit", async (e) => {
  e.preventDefault()
  const front = $("#create-form-front").val()
  const back = $("#create-form-back").val()
  const deck = $("#create-form-deck").val()

  const bodyData = {
    front: front,
    back: back,
    deck: deck,
  }

  try {
    await $.ajax({
      url: "/api/cards",
      type: "POST",
      contentType: "application/json;charset=utf-8",
      data: JSON.stringify(bodyData),
    })

    $("#confirm-success").html(`
    <div class="alert alert-success" role="alert">
      Card added!
    </div>`)

    $("#create-form-front").val("")
    $("#create-form-back").val("")
  } catch (err) {
    console.error(err)
    $("#confirm-success").html(`
    <div class="alert alert-danger" role="alert">
      An error occurred, please try again.
    </div>`)
  }
})
