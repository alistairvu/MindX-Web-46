import { Component } from "react"

interface AppToDoCountProps {
  todoList: ToDoItemInterface[]
}

export default class AppToDoCount extends Component<AppToDoCountProps> {
  render(): JSX.Element {
    const count = this.props.todoList.filter((item) => item.done === false).length

    if (count == 0) {
      return <h4 className="mb-3">All tasks are complete!</h4>
    }

    return <h4 className="mb-3">There {count === 1 ? "is 1 task" : `are ${count} tasks`} to complete.</h4>
  }
}
