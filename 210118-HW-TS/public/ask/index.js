console.log("Shoot take a pano-rama!")

const askForm = document.getElementById("ask-form")
const askBox = document.getElementById("ask-box")

const handleSubmit = async (e) => {
  e.preventDefault()
  const content = askBox.value
  const question = { content }

  try {
    const res = await fetch("http://localhost:6960/add-question", {
      method: "POST",
      body: new URLSearchParams(question),
    })
    const data = await res.json()
    console.log(data)
    alert("Your question has been posted successfully!")
    askForm.reset()
  } catch (err) {
    console.log(err)
  }
}

askForm.addEventListener("submit", handleSubmit)
