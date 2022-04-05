import { TextInput } from '@mantine/core'
import { useState } from 'react'
import { toast } from 'react-toastify'

interface IProps {
  postTodo: (text: string) => void
}

const TodoInput = ({ postTodo }: IProps) => {
  const [text, setText] = useState('')

  const handleInput = async (event: {
    preventDefault: () => void
    currentTarget: any
  }) => {
    event.preventDefault()

    if (!text) {
      return toast.error('Please enter text')
    }
    postTodo(text)

    setText('')
  }

  return (
    <form onSubmit={handleInput}>
      <TextInput
        label="New Todo:"
        name="text"
        placeholder="Add item to the list"
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
      />
    </form>
  )
}

export default TodoInput
