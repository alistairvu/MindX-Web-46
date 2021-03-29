import Form from "react-bootstrap/Form"
import { useState, useEffect } from "react"
import debounce from "lodash.debounce"

interface AppSearchFormProps {
  fetchGifs: (keyword: string, offset: number) => Promise<void>
}

const AppSearchForm: React.FC<AppSearchFormProps> = ({ fetchGifs }) => {
  const [keyword, setKeyword] = useState("")
  const [offset, setOffset] = useState(0)

  const handleScroll = () => {
    const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight
    if (bottom) {
      setOffset((prev) => prev + 1)
    }
  }

  // add debounce here
  const debounceHandleScroll = debounce(handleScroll, 1000)

  useEffect(() => {
    window.addEventListener("scroll", debounceHandleScroll)
    return () => window.removeEventListener("scroll", () => debounceHandleScroll)
  }, [])

  useEffect(() => {
    fetchGifs(keyword, offset)
  }, [offset])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
    setOffset(0)
    let searchTimeout: NodeJS.Timeout | null = null

    if (searchTimeout !== null) {
      clearInterval(searchTimeout)
    }
    searchTimeout = setTimeout(() => fetchGifs(e.target.value, 0), 1500)
  }

  return (
    <Form className="d-flex">
      <Form.Control
        type="text"
        value={keyword}
        onChange={handleChange}
        className="me-3"
        placeholder={"Type your keyword here..."}
      />
    </Form>
  )
}

export default AppSearchForm
