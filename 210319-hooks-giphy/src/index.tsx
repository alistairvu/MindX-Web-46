import { render } from "react-dom"
import App from "./App"
import "./styles/index.scss"
import "./i18n"

const rootElement = document.getElementById("root")
render(<App />, rootElement)
