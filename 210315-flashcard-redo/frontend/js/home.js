$("#flip-btn").on("click", () => {
  $(".flip-card").toggleClass("flip-card-flipping")
})

let flashcardId = ""

const getRandomCard = async () => {
  try {
    const category = $('input[name="category"]:checked').val()

    const res = await $.ajax({
      url: "/api/flashcards/random",
      methods: "GET",
      data: { category },
    })

    if (res.success) {
      flashcardId = res.data._id
      $(".category").html(category)
      $(".flip-card-front").html(`<h1>${res.data.frontSide}</h1>`)
      $(".flip-card-back").html(`<h1>${res.data.backSide}</h1>`)
      if (res.data.isRemember) {
        $("#remember-btn").hide()
        $("#forget-btn").show()
      }
    }
  } catch (err) {
    console.log(err)
  }
}

getRandomCard()

$("#next-btn").on("click", () => getRandomCard())
$('input[name="category"]').on("input", () => getRandomCard())

$("#remember-btn").on("click", async () => {
  if (flashcardId) {
    const res = await $.ajax({
      url: `/api/flashcards/${flashcardId}`,
      method: "PUT",
      data: {
        isRemember: true,
      },
    })

    if (res.success) {
      $("#remember-btn").hide()
      $("#forget-btn").show()
    }
  }
})

$("#forget-btn").on("click", async () => {
  if (flashcardId) {
    const res = await $.ajax({
      url: `/api/flashcards/${flashcardId}`,
      method: "PUT",
      data: {
        isRemember: false,
      },
    })

    if (res.success) {
      $("#remember-btn").show()
      $("#forget-btn").hide()
    }
  }
})

$("#edit-btn").on("click", () => {
  if (flashcardId) {
    window.location.href = `/edit/flashcards/${flashcardId}`
  }
})
