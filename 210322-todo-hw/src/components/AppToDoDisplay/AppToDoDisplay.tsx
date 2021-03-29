import { Component, memo } from "react"
import ListGroup from "react-bootstrap/ListGroup"
import FormCheck from "react-bootstrap/FormCheck"
import Button from "react-bootstrap/Button"

interface AppToDoDisplayProps {
  item: ToDoItemInterface
  handleToggle: (id: number) => void
  handleDelete: (id: number) => void
}

class AppToDoDisplay extends Component<AppToDoDisplayProps> {
  render(): JSX.Element {
    const { item, handleToggle, handleDelete } = this.props

    return (
      <ListGroup.Item className="d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <FormCheck checked={item.done} onChange={() => handleToggle(item.id)} id={`item-${item.id}`} />
          <label
            className="ms-3"
            style={{ textDecoration: item.done ? "line-through" : " none" }}
            htmlFor={`item-${item.id}`}
          >
            {item.title}
          </label>
        </div>
        <Button variant="danger" onClick={() => handleDelete(item.id)}>
          Delete
        </Button>
      </ListGroup.Item>
    )
  }
}

export default memo(AppToDoDisplay)
