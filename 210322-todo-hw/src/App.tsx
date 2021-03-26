import Container from "react-bootstrap/Container"
import ListGroup from "react-bootstrap/ListGroup"
import { AppToDoCount, AppToDoDisplay, AppToDoInput } from "./components"
import { Component } from "react"

interface AppState {
  todoList: ToDoItemInterface[]
}

class App extends Component<Record<string, never>, AppState> {
  private id = 0

  state = {
    todoList: [
      {
        id: 0,
        title: "Learn react",
        done: false,
      },
    ],
  }

  handleAdd = (title: string): void => {
    this.id++
    this.setState((prev) => ({
      todoList: [...prev.todoList, { id: this.id, title: title, done: false }],
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
          <AppToDoInput handleAdd={this.handleAdd} />

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
