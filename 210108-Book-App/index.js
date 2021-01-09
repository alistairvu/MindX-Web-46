import Book from "./book.js"

// Elements
const bookForm = document.getElementById("book-form")
const display = document.getElementById("book-container")

// Functions
function fromArrToBooks(arr) {
  let html = ``
  arr.map((item, index) => {
    const { title, author, isbn } = item
    html += new Book(title, author, isbn, index).toHtml()
  })
  display.innerHTML = html

  Array.from(document.getElementsByClassName("del-btn")).map((x) =>
    x.addEventListener("click", deleteBook)
  )
}

function deleteBook(e) {
  const pos = parseInt(e.target.getAttribute("pos"))
  const data = JSON.parse(window.localStorage.getItem("books")) || []
  const newData = data.filter((item, index) => index !== pos)
  window.localStorage.setItem("books", JSON.stringify(newData))
  fromArrToBooks(newData)
  console.log(pos)
}

const handleSubmit = (e) => {
  e.preventDefault()
  const newBookObject = Object.fromEntries(new FormData(e.target))
  const data = JSON.parse(window.localStorage.getItem("books")) || []
  const newData = [newBookObject, ...data]
  window.localStorage.setItem("books", JSON.stringify(newData))
  fromArrToBooks(newData)
  e.target.reset()
}

// Add event listeners
bookForm.addEventListener("submit", handleSubmit)

// Function calls
const firstData = JSON.parse(window.localStorage.getItem("books")) || []
console.log(fromArrToBooks(firstData))
