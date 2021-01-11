import Book from "./book.js"

// Elements
const bookForm = document.getElementById("book-form")
const display = document.getElementById("book-container")

// Functions
function render(arr) {
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
  const del = confirm("Do you really want to delete this book?")
  if (del) {
    const pos = parseInt(e.target.getAttribute("pos"))
    const data = JSON.parse(window.localStorage.getItem("books")) || []
    const newData = data.filter((item, index) => index !== pos)
    window.localStorage.setItem("books", JSON.stringify(newData))
    render(newData)
  }
}

function handleSubmit(e) {
  e.preventDefault()
  const newBookObject = Object.fromEntries(new FormData(e.target))
  const { title, author, isbn } = newBookObject
  if (
    title.trim().length > 0 &&
    author.trim().length > 0 &&
    isbn.trim().length > 0
  ) {
    const data = JSON.parse(window.localStorage.getItem("books")) || []
    const newData = [newBookObject, ...data]
    window.localStorage.setItem("books", JSON.stringify(newData))
    render(newData)
    e.target.reset()
  }
}

// Add event listeners
bookForm.addEventListener("submit", handleSubmit)

// Function calls
const firstData = JSON.parse(window.localStorage.getItem("books")) || []
render(firstData)
