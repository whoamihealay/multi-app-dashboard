import { Center, List } from '@mantine/core'
import { Todo } from '../../interfaces'
import TodosItem from './TodosItem'

interface IProps {
  todos: Todo[]
  updateTodo: (id: string, reqbody: Todo) => void
  deleteTodo: (id: string) => void
}

const TodosList = ({ todos, updateTodo, deleteTodo }: IProps) => {
  return (
    <>
      <List>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <TodosItem
              key={todo._id}
              todo={todo}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          ))
        ) : (
          <Center>List Empty</Center>
        )}
      </List>
    </>
  )
}

export default TodosList
