const toDoList = document.getElementById("to-do-list")
const toDoAdd = document.getElementById("to-do-add")
const addBtn = document.getElementById("add-btn")
const searchBar = document.getElementById("search-bar")
const clearSearch = document.getElementById("clear-search")

// functions
function getItems(items) {
  let html = ``
  items.map(
    (item, index) =>
      (html += `<li>${item} <button index=${index} class="remove-btn">X</button></li>`)
  )
  toDoList.innerHTML = `
  <ul>
    ${html}
  </ul>`

  Array.from(document.getElementsByClassName("remove-btn")).forEach((x) =>
    x.addEventListener("click", removeItem)
  )
}

function removeItem(e) {
  const deleteIndex = parseInt(e.target.getAttribute("index"))
  const items = JSON.parse(window.localStorage.getItem("to-do")) || []
  const newItems = items.filter((item, index) => index !== deleteIndex)
  window.localStorage.setItem("to-do", JSON.stringify(newItems))
  getItems(JSON.parse(window.localStorage.getItem("to-do")))
}

const addItem = () => {
  const nextToDo = toDoAdd.value
  const items = JSON.parse(window.localStorage.getItem("to-do")) || []
  window.localStorage.setItem("to-do", JSON.stringify([nextToDo, ...items]))
  getItems(JSON.parse(window.localStorage.getItem("to-do")))
  toDoAdd.value = ""
}

const findItem = (e) => {
  const searchTerm = e.target.value.trim().toLowerCase()
  console.log(searchTerm)
  const items = JSON.parse(window.localStorage.getItem("to-do")) || []
  const goodItems =
    searchTerm.length > 0
      ? items.filter((item) => item.toLowerCase().includes(searchTerm))
      : items
  console.log(goodItems)
  getItems(goodItems)
}

const deleteSearch = (e) => {
  e.preventDefault()
  searchBar.value = ""
}

// events
getItems(JSON.parse(window.localStorage.getItem("to-do")))

addBtn.addEventListener("click", addItem)
toDoAdd.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addItem()
  }
})

searchBar.addEventListener("keypress", findItem)
clearSearch.addEventListener("click", deleteSearch)
