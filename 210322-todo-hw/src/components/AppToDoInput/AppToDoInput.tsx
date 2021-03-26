import React from "react"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import Button from "react-bootstrap/Button"

interface AppToDoInputProps {
  handleAdd: (newItem: string) => void
}

interface AppToDoInputState {
  nextTitle: string
}

export default class AppToDoInput extends React.Component<AppToDoInputProps, AppToDoInputState> {
  state = {
    nextTitle: "",
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (this.state.nextTitle.trim()) {
      this.props.handleAdd(this.state.nextTitle)
      this.setState({ nextTitle: "" })
    }
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ nextTitle: e.target.value })
  }

  render(): JSX.Element {
    return (
      <Form onSubmit={this.handleSubmit} className="mb-3">
        <InputGroup>
          <Form.Control
            placeholder="Enter new todo..."
            type="text"
            value={this.state.nextTitle}
            onChange={this.handleInputChange}
          />
          <Button variant="primary" type="submit">
            Add
          </Button>
        </InputGroup>
      </Form>
    )
  }
}
