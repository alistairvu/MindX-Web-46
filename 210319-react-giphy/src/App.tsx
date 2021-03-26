import Container from "react-bootstrap/Container"
import Spinner from "react-bootstrap/Spinner"
import { Component } from "react"
import { Helmet } from "react-helmet"
import axios from "axios"
import { GifCard, Header, SearchForm } from "./components"

interface AppState {
  offset: number
  searchData: GIFInterface[]
  loading: boolean
  currentKeyword: string
}

class App extends Component<Record<string, never>, AppState> {
  state = {
    currentKeyword: "",
    offset: 0,
    searchData: [] as GIFInterface[],
    loading: false,
  }

  fetchGifs = async (keyword: string = this.state.currentKeyword) => {
    this.setState({ loading: true })

    const { data } = await axios.get(
      `//api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${process.env.REACT_APP_GIPHY_API_KEY}&limit=20&offset=${
        this.state.offset * 20
      }`,
    )
    console.log(data)

    this.setState((prev) => ({
      searchData: [...prev.searchData, ...data.data],
      loading: false,
    }))
  }

  handleSearch = (keyword: string) => {
    this.setState({ searchData: [], offset: 0, currentKeyword: keyword }, () => {
      this.fetchGifs(keyword)
    })
  }

  handleScroll = () => {
    const bottom =
      Math.ceil(document.documentElement.scrollTop + document.documentElement.clientHeight) >=
      document.documentElement.scrollHeight
    if (bottom) {
      console.log("Loading...")
      this.setState(
        (prev) => ({ offset: prev.offset + 1 }),
        () => {
          this.fetchGifs()
        },
      )
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  }

  render() {
    const { loading, searchData } = this.state

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
            <SearchForm handleSearch={this.handleSearch} isLoading={loading} />

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
