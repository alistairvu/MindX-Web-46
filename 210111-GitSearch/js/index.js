import "./app-header.js"
import "./data-display.js"
import "./error-display.js"

// HTML elements
const searchForm = document.getElementById("search-form")
const searchBar = document.getElementById("search-term")
const resultDisplay = document.getElementById("result-display")

// JS functions
const findUser = async (e) => {
  e.preventDefault()
  const searchTerm = searchBar.value.trim()
  if (searchTerm.length > 0) {
    const res = await fetch(`https://api.github.com/users/${searchTerm}`)
    if (res.ok) {
      const data = await res.json()
      const { followers, avatar_url, name, login, email, company } = data
      const filteredData = {
        followers,
        avatar_url,
        username: login,
        name,
        email,
        company,
      }
      resultDisplay.innerHTML = `<data-display data='${JSON.stringify(
        filteredData
      )}'></data-display>`
    } else {
      resultDisplay.innerHTML = `<error-display code="${res.status}"></error-display>`
    }
  }
}

// Add event listener
searchForm.addEventListener("submit", findUser)
