import "/components/app-header.js"
const askForm = document.getElementById("ask-form")
const askBox = document.getElementById("ask-box")
const charCount = document.getElementById("char-count")

const handleSubmit = async (e) => {
  e.preventDefault()
  const content = askBox.value
  const question = { content }

  if (content.trim().length > 0) {
    try {
      const res = await fetch("http://localhost:6960/add-question", {
        method: "POST",
        body: new URLSearchParams(question),
      })
      const data = await res.json()
      console.log(data)
      alert("Your question has been posted successfully!")
      askForm.reset()
      charCount.innerHTML = `0/200 characters`
    } catch (err) {
      console.log(err)
    }
  }
}

const countChar = () => {
  e.preventDefault()
  const count = askBox.value.length
  charCount.innerHTML = `${count}/200 characters`
  if (count >= 190) {
    charCount.style.color = "red"
  } else {
    charCount.style.color = "black"
  }
}

const handlePaste = (e) => {
  let pasteData = (e.clipboardData || window.clipboardData).getData("text")
  const count = askBox.value.length + pasteData.length
  charCount.innerHTML = `${count}/200 characters`
}

askForm.addEventListener("submit", handleSubmit)
askBox.addEventListener("keyup", countChar)
askBox.addEventListener("paste", handlePaste)
