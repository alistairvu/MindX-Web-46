import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { Component } from "react"

export interface SearchFormProps {
  handleSearch: (keyword: string) => void
  isLoading: boolean
}

interface SearchFormState {
  keyword: string
}

class SearchForm extends Component<SearchFormProps, SearchFormState> {
  state = {
    keyword: "",
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    this.props.handleSearch(this.state.keyword)
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="d-flex">
        <Form.Control
          type="text"
          value={this.state.keyword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ keyword: e.target.value })}
          placeholder="Type your keyword here..."
          className="me-3"
        />

        <Button
          variant="primary"
          type="submit"
          disabled={this.props.isLoading || this.state.keyword.trim().length == 0}
        >
          Search
        </Button>
      </Form>
    )
  }
}

export default SearchForm
