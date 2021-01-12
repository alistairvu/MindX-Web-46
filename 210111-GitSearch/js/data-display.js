const styles = `
<style>
* {
  margin: 0;
  padding: 0;
  font-size: 15px;
}

.container {
  width: 60vw;
  margin: 1rem auto;
}

@media (max-width: 729px) {
  .container {
    width: 80vw;
  }
}

h1 {
  font-size: 2rem;
  padding: 1rem;
  text-align: center;
  color: #6cc644
}

img {
  margin-left: calc(50% - 100px);
  width: 200px;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item p, .item b {
  font-size: 1.25rem;
  padding: 0.5rem;
}
</style>`

class DataDisplay extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: "open" })
    this.data = JSON.parse(this.getAttribute("data"))
  }

  connectedCallback() {
    const { followers, avatar_url, name, username, email, company } = this.data
    this._shadowRoot.innerHTML = `
    ${styles}
    <div class="body">
    <div class="container">
      <h1>User ${username} found!</h1>
      <img src="${avatar_url}" alt="Avatar of user ${username}" />
      <div class="item">
        <b>Username</b>
        <p>${username}</p>
      </div>
      ${
        name
          ? `
      <div class="item">
        <b>Name</b>
        <p>${name}</p>
      </div>`
          : ""
      }
      ${
        email
          ? `
      <div class="item">
        <b>Email</b>
        <p>${email}</p>
      </div>`
          : ""
      }
      ${
        company
          ? `
      <div class="item">
        <b>Company</b>
        <p>${company}</p>
      </div>`
          : ""
      }
      <div class="item">
        <b>Followers</b>
        <p>${followers}</p>
      </div>
    </div>
    </div>`
  }
}

window.customElements.define("data-display", DataDisplay)
