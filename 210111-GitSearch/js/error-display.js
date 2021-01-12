const styles = `
<style>
* {
  margin: 0;
  padding: 0;
  font-size: 15px;
}

h1, p {
  color: #bd2c00;
  text-align: center;
}

h1 {
  font-size: 2rem;
  padding: 1rem;
}

p {
  font-size: 1.5rem;
}
</style>`

class ErrorDisplay extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: "open" })
    this.code = this.getAttribute("code")
    this.message =
      this.code === "404" ? "User not found" : "Rate limit exceeded"
    this.tips =
      this.code === "404"
        ? "Check the spelling of your search query."
        : "Please try again later."
  }

  connectedCallback() {
    this._shadowRoot.innerHTML = `
    ${styles}
    <div class="container">
      <h1>${this.message}</h1>
      <p>${this.tips}</p>
    </div>`
  }
}

window.customElements.define("error-display", ErrorDisplay)
