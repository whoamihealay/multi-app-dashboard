import { Button, TextInput, PasswordInput } from '@mantine/core'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { At, Lock, User } from 'tabler-icons-react'
import { IUser } from '../interfaces'
import { credendials } from '../router'

interface IProps {
  register: (credentials: credendials) => void
  user: IUser
}

const Register = ({ user, register }: IProps) => {
  const navigate = useNavigate()

  const handleRegister = async (event: {
    preventDefault: () => void
    currentTarget: any
  }) => {
    event.preventDefault()
    const form = event.currentTarget
    const formElements = form.elements
    const username = formElements.username.value
    const email = formElements.email.value
    const password = formElements.password.value
    const confirmation = formElements.confirmation.value

    if (!username || !email || !password || !confirmation) {
      return toast.error('Please enter all fields')
    }

    if (password != confirmation) {
      toast.error('Passwords do not match !')
    } else {
      await register({ username, email, password })
    }
  }

  useEffect(() => {
    if (user && user._id) {
      navigate('/home')
    }
  }, [user, navigate])

  return (
    <>
      <h1>Sign up</h1>
      <section>
        <form onSubmit={handleRegister}>
          <TextInput
            label="Username:"
            name="username"
            aria-label="username"
            placeholder="Your username"
            icon={<User />}
            required
          />
          <TextInput
            label="Email:"
            name="email"
            aria-label="email"
            type="email"
            placeholder="Your email"
            icon={<At />}
            required
          />
          <PasswordInput
            label="Password:"
            name="password"
            aria-label="password"
            placeholder="Your password"
            icon={<Lock />}
            required
          />
          <PasswordInput
            label="Password confirmation:"
            name="confirmation"
            aria-label="password confirmation"
            placeholder="Your password"
            icon={<Lock />}
            required
          />
          <Button type="submit">Sign up</Button>
        </form>
      </section>
    </>
  )
}

export default Register
