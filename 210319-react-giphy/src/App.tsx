import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Spinner from "react-bootstrap/Spinner"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import { Component } from "react"
import { Helmet } from "react-helmet"
import axios from "axios"
import { GifCard, Header } from "./components"

interface AppState {
  keyword: string
  offset: number
  searchData: GIFInterface[]
  loading: boolean
}

class App extends Component<Record<string, never>, AppState> {
  state = {
    keyword: "",
    offset: 0,
    searchData: [] as GIFInterface[],
    loading: false,
  }

  fetchGifs = async () => {
    this.setState({ loading: true })

    const { data } = await axios.get(
      `//api.giphy.com/v1/gifs/search?q=${this.state.keyword}&api_key=${
        process.env.REACT_APP_GIPHY_API_KEY
      }&limit=20&offset=${this.state.offset * 20}`,
    )
    console.log(data)

    this.setState((prev) => ({
      offset: prev.offset + 1,
      searchData: [...prev.searchData, ...data.data],
      loading: false,
    }))
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    this.setState({ searchData: [], offset: 0 }, () => {
      this.fetchGifs()
    })
  }

  handleScroll = () => {
    const bottom =
      Math.ceil(document.documentElement.scrollTop + document.documentElement.clientHeight) >=
      document.documentElement.scrollHeight
    if (bottom) {
      console.log("Loading...")
      this.fetchGifs()
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  }

  handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ keyword: e.target.value })
  }

  render() {
    const { keyword, loading, searchData } = this.state

    return (
      <>
        <Helmet>
          <title>GIF Search</title>
        </Helmet>

        <Container className="text-center py-5">
          <header>
            <Header />
          </header>

          <main>
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    value={keyword}
                    onChange={this.handleKeywordChange}
                    placeholder="Type your keyword here..."
                  />
                </Col>
                <Col sm={3}>
                  <Button variant="primary" type="submit">
                    Search
                  </Button>
                </Col>
              </Row>
            </Form>

            <>
              {searchData.map((gif) => (
                <GifCard image={gif.images.downsized.url} title={gif.title} key={gif.id} />
              ))}
              {loading && <Spinner animation="border" className="mt-4" />}
            </>
          </main>
        </Container>
      </>
    )
  }
}

export default App
