const styles = `
<style>
* {
  margin: 0;
  padding: 0;
}

.container {
  height: 5vh;
  background: black;
}

h2 {
  color: white;
  line-height: 5vh;
  margin-left: 10vw;
}
</style>`

class AppHeader extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: "open" })
  }

  connectedCallback() {
    this._shadowRoot.innerHTML = `
    ${styles}
    <div class="container">
      <h2>GitSearch</h2>
    </div>`
  }
}

window.customElements.define("app-header", AppHeader)
