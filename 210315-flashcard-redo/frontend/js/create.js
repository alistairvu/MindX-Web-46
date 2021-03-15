$("#flashcard-form").on("submit", async (e) => {
  e.preventDefault()

  const newFlashcard = {
    frontSide: $("#front").val(),
    backSide: $("#back").val(),
    category: $("#category").val(),
  }

  console.log(JSON.stringify(newFlashcard))

  try {
    const res = await $.ajax({
      url: "/api/flashcards",
      type: "POST",
      contentType: "application/json;charset=utf-8",
      data: JSON.stringify(newFlashcard),
    })

    if (res.success) {
      alert("Card created!")
      $("#front").val()
      $("#back").val()
      $("#cafe").val()
    }
  } catch (err) {
    console.error(err)
  }
})
