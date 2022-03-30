// Libraries
import { useNavigate } from 'react-router-dom'
// Styles
import { Button, TextInput, PasswordInput } from '@mantine/core'
import { Lock, User } from 'tabler-icons-react'
import { credendials } from '../router'
import { toast } from 'react-toastify'

interface IProps {
  login: (credentials: credendials) => void
}

const Login = ({ login }: IProps) => {
  const navigate = useNavigate()

  let isLoading = false

  let isDisabled = isLoading

  const handleLogin = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const formElements = form.elements
    const username = formElements.username.value
    const password = formElements.password.value

    if (!username || !password) {
      return toast.error('Please enter all fields')
    }

    await login({
      username,
      password
    })
  }

  return (
    <>
      <section>
        <h1>Login</h1>
      </section>
      <section>
        <form onSubmit={handleLogin}>
          <TextInput
            label="Username:"
            name="username"
            placeholder="Your username"
            icon={<User />}
            required
            disabled={isDisabled}
          />
          <PasswordInput
            label="Password:"
            name="password"
            placeholder="Your password"
            icon={<Lock />}
            required
            disabled={isDisabled}
          />
          <Button type="submit" loading={isLoading}>
            Submit
          </Button>
        </form>
      </section>
    </>
  )
}

export default Login
