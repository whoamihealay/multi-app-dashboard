import { Checkbox, CloseButton, Group, List, Text } from '@mantine/core'
import { useEffect, useState } from 'react'
import { Todo } from '../../interfaces'

interface IProps {
  todo: Todo
  updateTodo: (id: string, reqBody: any) => void
  deleteTodo: (id: string) => void
}

const TodosItem = ({ todo, updateTodo, deleteTodo }: IProps) => {
  const [isChecked, setIsChecked] = useState(todo.completed)

  const handleChange = async (event: {
    preventDefault: () => void
    currentTarget: { value: any }
  }) => {
    event.preventDefault()
    const reqBody = { todo: { completed: !isChecked } }
    await updateTodo(todo._id, reqBody)
  }

  useEffect(() => {
    setIsChecked(todo.completed)
  }, [todo])

  return (
    <Group position="apart">
      <List.Item
        icon={
          <Checkbox
            aria-label="Completion status"
            radius="xl"
            checked={isChecked}
            onChange={handleChange}
          />
        }
      >
        <Text style={{ textDecoration: isChecked ? 'line-through' : 'none' }}>
          {todo.text}
        </Text>
      </List.Item>
      <CloseButton
        aria-label="Delete todo"
        title="Delete todo"
        size="lg"
        iconSize={20}
        onClick={() => deleteTodo(todo._id)}
      />
    </Group>
  )
}

export default TodosItem
