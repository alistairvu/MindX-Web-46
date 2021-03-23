import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import Button from "react-bootstrap/Button"
import ListGroup from "react-bootstrap/ListGroup"
import { AppToDoCount, AppToDoDisplay } from "./components"
import { Component } from "react"

interface AppState {
  todoList: ToDoItemInterface[]
  id: number
  nextTitle: string
}

class App extends Component<Record<string, never>, AppState> {
  state = {
    todoList: [
      {
        id: 0,
        title: "Learn react",
        done: false,
      },
    ],
    id: 1,
    nextTitle: "",
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ nextTitle: e.target.value })
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    this.setState((prev) => ({
      id: prev.id + 1,
      todoList: [...prev.todoList, { id: prev.id, title: prev.nextTitle, done: false }],
      nextTitle: "",
    }))
  }

  handleToggle = (id: number): void => {
    this.setState((prev) => {
      const newToDoList = prev.todoList.map((item) => {
        if (item.id === id) {
          return { ...item, done: !item.done }
        }
        return item
      })
      return { todoList: newToDoList }
    })
  }

  handleDelete = (id: number): void => {
    this.setState((prev) => {
      const newToDoList = prev.todoList.filter((item) => item.id !== id)
      return { todoList: newToDoList }
    })
  }

  render(): JSX.Element {
    return (
      <main>
        <Container className="py-3">
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

          <AppToDoCount todoList={this.state.todoList} />

          <ListGroup>
            {this.state.todoList.map((item) => (
              <AppToDoDisplay
                key={item.id}
                item={item}
                handleDelete={this.handleDelete}
                handleToggle={this.handleToggle}
              />
            ))}
          </ListGroup>
        </Container>
      </main>
    )
  }
}

export default App
