import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { Component } from "react"

export interface SearchFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  keyword: string
  setKeyword: (value: string) => void
  isLoading: boolean
}

class SearchForm extends Component<SearchFormProps> {
  render() {
    return (
      <Form onSubmit={this.props.handleSubmit} className="d-flex">
        <Form.Control
          type="text"
          value={this.props.keyword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.props.setKeyword(e.target.value)}
          placeholder="Type your keyword here..."
          className="me-3"
        />

        <Button
          variant="primary"
          type="submit"
          disabled={this.props.isLoading || this.props.keyword.trim().length == 0}
        >
          Search
        </Button>
      </Form>
    )
  }
}

export default SearchForm
