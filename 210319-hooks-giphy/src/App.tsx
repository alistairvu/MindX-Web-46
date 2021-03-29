import Container from "react-bootstrap/Container"
import Spinner from "react-bootstrap/Spinner"
import { useState } from "react"
import axios from "axios"
import { AppGifCard, AppHeader, AppSearchForm } from "./components"

const App: React.FC = () => {
  const [searchData, setSearchData] = useState<GIFInterface[]>([] as GIFInterface[])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchGifs = async (keyword: string, offset: number) => {
    setIsLoading(true)

    if (offset == 0) {
      setSearchData([])
    }

    const { data } = await axios.get(
      `//api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${process.env.REACT_APP_GIPHY_API_KEY}&limit=20&offset=${
        offset * 20
      }`,
    )

    setSearchData((prev) => [...prev, ...data.data])
    setIsLoading(false)
    console.log("Loading...")
  }

  return (
    <>
      <main>
        <Container className="text-center py-5">
          <AppHeader />

          <AppSearchForm fetchGifs={fetchGifs} />

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
