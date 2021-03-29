import Container from "react-bootstrap/Container"
import ListGroup from "react-bootstrap/ListGroup"
import AppToDoCount from "./components/AppToDoCount"
import AppToDoDisplay from "./components/AppToDoDisplay"
import AppToDoInput from "./components/AppToDoInput"
import { useState, useRef, useCallback } from "react"

const App: React.FC = () => {
  const [todoList, setToDoList] = useState<ToDoItemInterface[]>([
    {
      id: 0,
      title: "Learn react",
      done: false,
    },
  ])
  const idRef = useRef<number>(0)

  const handleAdd = (title: string) => {
    idRef.current++
    setToDoList((prev) => [
      ...prev,
      { id: idRef.current, title: title, done: false },
    ])
  }

  const handleToggle = useCallback((id: number) => {
    setToDoList((prev) => {
      const newToDoList = prev.map((item) => {
        if (item.id === id) {
          return { ...item, done: !item.done }
        }
        return item
      })
      return newToDoList
    })
  }, [])

  const handleDelete = useCallback((id: number) => {
    setToDoList((prev) => {
      const newToDoList = prev.filter((item) => item.id !== id)
      return newToDoList
    })
  }, [])

  return (
    <main>
      <Container className="py-3">
        <AppToDoInput handleAdd={handleAdd} />

        <AppToDoCount todoList={todoList} />

        <ListGroup>
          {todoList.map((item) => (
            <AppToDoDisplay
              key={item.id}
              item={item}
              handleDelete={handleDelete}
              handleToggle={handleToggle}
            />
          ))}
        </ListGroup>
      </Container>
    </main>
  )
}

export default App
