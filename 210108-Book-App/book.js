// eslint-disable-next-line
export default function Book(title, author, isbn, index) {
  this.title = title
  this.author = author
  this.isbn = isbn
  this.index = index
}

Book.prototype.toHtml = function () {
  return `
    <div class="book-display">
      <p class="title">${this.title}</p>
      <p class="author">${this.author}</p>
      <p class="isbn">${this.isbn}</p>
      <button class="del-btn" pos="${this.index}">X</button>
    </div>`
}
