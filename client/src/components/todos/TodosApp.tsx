import { Center, Group } from '@mantine/core'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { IUser, Todo } from '../../interfaces'
import TodoInput from './TodoInput'
import TodosList from './TodosList'

interface IProps {
  user: IUser
}

const TodosApp = ({ user }: IProps) => {
  const [todos, setTodos] = useState<Todo[]>([])

  const postTodo = async (text: string) => {
    try {
      const { data } = await axios.post('/api/todos', { text })
      setTodos((prev) => [...prev, data])
    } catch (error) {
      console.log(error)
    }
  }

  const updateTodo = async (id: string, body: Todo) => {
    try {
      const { data } = await axios.put('/api/todos/' + id, body)
      updateLocalTodo(data)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTodo = async (id: string) => {
    try {
      const { data } = await axios.delete('/api/todos/' + id)
      removeLocalTodo(data)
    } catch (error) {
      console.log(error)
    }
  }

  const updateLocalTodo = useCallback((data) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo._id === data._id) {
          const todoCopy = { ...todo, completed: data.completed }
          return todoCopy
        }
        return todo
      })
    )
  }, [])

  const removeLocalTodo = useCallback((data) => {
    setTodos((prev) => prev.filter((todo) => todo._id !== data.id))
  }, [])

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { data } = await axios.get('/api/todos')
        setTodos(data)
      } catch (error: any) {
        console.log(error)
      }
    }

    if (user && user._id) {
      fetchTodos()
    }
  }, [user._id])

  return (
    <Center>
      <Group direction="column" grow>
        <TodosList
          todos={todos}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
        <TodoInput postTodo={postTodo} />
      </Group>
    </Center>
  )
}

export default TodosApp
