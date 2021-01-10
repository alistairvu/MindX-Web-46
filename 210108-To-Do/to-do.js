import { getItems } from "./index.js"

const styles = `
<style>
.container {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

#del-btn {
  font-family: "Roboto Slab", serif;
  color: #1d3c34;
  background: #e6e6de;
  border: none;
  padding: 0px 10px;
  height: 2rem;
}

#item {
  font-size: 1.25rem;
}
</style>`

class ToDo extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: "open" })
    this.item = this.getAttribute("item")
    this.index = this.getAttribute("index")
  }

  connectedCallback() {
    this._shadowRoot.innerHTML = `
    ${styles}
    <div class="container">
      <p id="item">${this.item}</p>
      <button id="del-btn">X</button>
    </div>`

    this._shadowRoot
      .getElementById("del-btn")
      .addEventListener("click", (e) => this.deleteItem(e))
  }

  deleteItem(e) {
    e.preventDefault()
    const deleteConfirm = confirm("Do you want to delete?")
    if (deleteConfirm) {
      const deleteIndex = parseInt(this.index)
      const items = JSON.parse(window.localStorage.getItem("to-do")) || []
      const newItems = items.filter((item, index) => index !== deleteIndex)
      window.localStorage.setItem("to-do", JSON.stringify(newItems))
      getItems(JSON.parse(window.localStorage.getItem("to-do")))
    }
  }
}

window.customElements.define("to-do", ToDo)
