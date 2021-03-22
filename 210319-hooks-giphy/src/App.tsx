import Container from "react-bootstrap/Container"
import Spinner from "react-bootstrap/Spinner"
import { useState, useEffect } from "react"
import axios from "axios"
import { AppGifCard, AppHeader, AppSearchForm } from "./components"

const App: React.FC = () => {
  const [keyword, setKeyword] = useState<string>("")
  const [offset, setOffset] = useState<number>(0)
  const [searchData, setSearchData] = useState<GIFInterface[]>([] as GIFInterface[])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchGifs = async (keyword: string, offset: number) => {
    setIsLoading(true)
    const { data } = await axios.get(
      `//api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${process.env.REACT_APP_GIPHY_API_KEY}&limit=20&offset=${
        offset * 20
      }`,
    )

    setOffset((prev) => prev + 1)
    setSearchData((prev) => [...prev, ...data.data])
    setIsLoading(false)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearchData([])
    setOffset(0)
    fetchGifs(keyword, offset)
  }

  const handleScroll = () => {
    const bottom =
      Math.ceil(document.documentElement.scrollTop + document.documentElement.clientHeight) >=
      document.documentElement.scrollHeight
    if (bottom) {
      console.log("Loading...")
      fetchGifs(keyword, offset)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <main>
        <Container className="text-center py-5">
          <AppHeader />

          <AppSearchForm handleSubmit={handleSubmit} keyword={keyword} setKeyword={setKeyword} isLoading={isLoading} />

          <>
            {searchData.map((gif) => (
              <AppGifCard image={gif.images.downsized.url} title={gif.title} key={gif.id} />
            ))}
            {isLoading && <Spinner animation="border" className="mt-4" />}
          </>
        </Container>
      </main>
    </>
  )
}

export default App
