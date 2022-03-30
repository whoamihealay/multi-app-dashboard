// Libraries
import { useNavigate } from 'react-router-dom'
// Styles
import { Button, TextInput, PasswordInput } from '@mantine/core'
import { Lock, User } from 'tabler-icons-react'
import { credendials } from '../router'
import { toast } from 'react-toastify'
import { IUser } from '../interfaces'
import { useEffect } from 'react'

interface IProps {
  login: (credentials: credendials) => void
  user: IUser
}

const Login = ({ user, login }: IProps) => {
  const navigate = useNavigate()

  let isLoading = false

  let isDisabled = isLoading

  const handleLogin = async (event: {
    preventDefault: () => void
    currentTarget: any
  }) => {
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

  useEffect(() => {
    if (user && user._id) {
      navigate('/home')
    }
  }, [user, navigate])

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
            Login
          </Button>
        </form>
      </section>
    </>
  )
}

export default Login
