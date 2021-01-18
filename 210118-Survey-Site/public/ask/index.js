const createForm = document.getElementById("question-form")
const formQuestion = document.getElementById("question-create")

createForm.addEventListener("submit", async (e) => {
  e.preventDefault()
  const content = formQuestion.value
  const question = { content }

  const res = await fetch("http://localhost:6960/add-question", {
    method: "POST",
    body: new URLSearchParams(question),
  })
  const data = await res.json()
  console.log(data)

  formQuestion.value = ""
})
