import { Component } from "react"
import GIPHYLogo from "../../images/1280px-Giphy-logo.png"

export default class Header extends Component {
  render() {
    return (
      <>
        <img src={GIPHYLogo} alt="GIPHY logo" style={{ height: 100 }} />
        <h1 className="pt-4">Welcome to GIF Search!</h1>
      </>
    )
  }
}
