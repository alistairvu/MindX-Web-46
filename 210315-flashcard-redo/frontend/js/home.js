$("#flip-btn").on("click", () => {
  $(".flip-card").toggleClass("flip-card-flipping")
})

const getRandomCard = async () => {
  try {
    const category = $('input[name="category"]:checked').val()

    const res = await $.ajax({
      url: "/api/flashcards/random",
      methods: "GET",
      data: { category },
    })

    if (res.success) {
      console.log(res.data)
    }
  } catch (err) {
    console.log(err)
  }
}

getRandomCard()

$("#next-btn").on("click", () => getRandomCard())
$('input[name="category"]').on("input", () => getRandomCard())
