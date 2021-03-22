import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

export interface AppSearchFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  keyword: string
  setKeyword: (value: React.SetStateAction<string>) => void
  isLoading: boolean
}

const AppSearchForm: React.FC<AppSearchFormProps> = ({ handleSubmit, keyword, setKeyword, isLoading }) => {
  return (
    <Form onSubmit={handleSubmit} className="d-flex">
      <Form.Control
        type="text"
        value={keyword}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
        className="me-3"
        placeholder={"Type your keyword here..."}
      />

      <Button variant="primary" type="submit" disabled={isLoading || keyword.trim().length == 0}>
        Search
      </Button>
    </Form>
  )
}

export default AppSearchForm
