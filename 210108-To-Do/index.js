import "./to-do.js"
const toDoList = document.getElementById("to-do-list")
const toDoAdd = document.getElementById("to-do-add")
const addBtn = document.getElementById("add-btn")
const searchBar = document.getElementById("search-bar")
const clearSearch = document.getElementById("clear-search")
const clearBtn = document.getElementById("clear-btn")

// functions
export function getItems(items) {
  let html = ``
  items.map(
    (item, index) => (html += `<to-do item="${item}" index=${index}></to-do>`)
  )
  toDoList.innerHTML = `
  <div>
    ${html}
  </div>`
}

const addItem = () => {
  const nextToDo = toDoAdd.value
  console.log(nextToDo)
  if (nextToDo.trim().length > 0) {
    const items = JSON.parse(window.localStorage.getItem("to-do")) || []
    window.localStorage.setItem("to-do", JSON.stringify([nextToDo, ...items]))
    getItems(JSON.parse(window.localStorage.getItem("to-do")))
    toDoAdd.value = ""
  }
}

const findItem = (e) => {
  const searchTerm = e.target.value.trim().toLowerCase()
  const items = JSON.parse(window.localStorage.getItem("to-do")) || []
  const goodItems =
    searchTerm.length > 0
      ? items.filter((item) => item.toLowerCase().includes(searchTerm))
      : items
  getItems(goodItems)
}

const deleteSearch = (e) => {
  e.preventDefault()
  searchBar.value = ""
}

const clearAll = (e) => {
  e.preventDefault()
  window.localStorage.setItem("to-do", JSON.stringify([]))
  getItems(JSON.parse(window.localStorage.getItem("to-do")))
}
// events
getItems(JSON.parse(window.localStorage.getItem("to-do")) || [])

addBtn.addEventListener("click", addItem)
toDoAdd.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addItem()
  }
})

searchBar.addEventListener("keyup", findItem)
clearSearch.addEventListener("click", deleteSearch)
clearBtn.addEventListener("click", clearAll)
