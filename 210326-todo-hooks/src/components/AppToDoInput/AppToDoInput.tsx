import { useState } from "react"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import Button from "react-bootstrap/Button"

interface AppToDoInputProps {
  handleAdd: (newItem: string) => void
}

const AppToDoInput: React.FC<AppToDoInputProps> = ({ handleAdd }) => {
  const [nextTitle, setNextTitle] = useState<string>("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (nextTitle.trim()) {
      handleAdd(nextTitle)
      setNextTitle("")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNextTitle(e.target.value)
  }

  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <InputGroup>
        <Form.Control
          placeholder="Enter new todo..."
          type="text"
          value={nextTitle}
          onChange={handleInputChange}
        />
        <Button variant="primary" type="submit">
          Add
        </Button>
      </InputGroup>
    </Form>
  )
}

export default AppToDoInput
