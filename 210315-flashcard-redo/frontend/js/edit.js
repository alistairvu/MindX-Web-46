const flashcardId = window.location.pathname.split("/").pop()

const getDetailCard = async () => {
  const res = await $.ajax({
    url: `/api/flashcards/${flashcardId}`,
    method: "GET",
  })

  if (res.success) {
    const { backSide, frontSide, category } = res.data

    $("#back").val(backSide)
    $("#front").val(frontSide)
    $("#category").val(category)
  }
}

$("#flashcard-form").on("submit", async (e) => {
  e.preventDefault()

  const updatedCard = {
    frontSide: $("#front").val(),
    backSide: $("#back").val(),
    category: $("#category").val(),
  }

  try {
    const res = await $.ajax({
      url: `/api/flashcards/${flashcardId}`,
      type: "PUT",
      contentType: "application/json;charset=utf-8",
      data: JSON.stringify(updatedCard),
    })

    if (res.success) {
      window.location.href = "/"
    }
  } catch (err) {
    console.error(err)
  }
})

getDetailCard()
