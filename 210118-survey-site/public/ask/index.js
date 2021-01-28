const askForm = $("#ask-form")
const askBox = document.getElementById("ask-box")
const charCount = $("#char-count")

const handleSubmit = async (e) => {
  e.preventDefault()
  const content = askBox.value
  const question = { content }

  if (content.trim().length > 0) {
    try {
      const res = await fetch("http://localhost:6960/api/add-question", {
        method: "POST",
        body: new URLSearchParams(question),
      })
      const data = await res.json()
      console.log(data)
      alert("Your question has been posted successfully!")
      // if (res.success) {
      //   window.location.href = "/"
      // }
      askForm.reset()
      charCount.innerHTML = `0/200 characters`
    } catch (err) {
      console.log(err)
    }
  }
}

const countChar = () => {
  const count = askBox.value.length
  charCount.html(`<p>${count}/200 characters</p>`)
  if (count >= 190) {
    charCount.css("color", "red")
  } else {
    charCount.css("color", "black")
  }
}

askForm.submit(handleSubmit)
askBox.addEventListener("input", countChar)
