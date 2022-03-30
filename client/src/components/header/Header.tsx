import { ActionIcon, Group, useMantineColorScheme } from '@mantine/core'
import { Link } from 'react-router-dom'
import { Sun, MoonStars, User } from 'tabler-icons-react'
import { IUser } from '../../interfaces'

interface IProps {
  logout: () => void
  user: IUser
}

const Header = ({ user, logout }: IProps) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const isLoggedIn = user && user._id ? true : false

  return (
    <Group position="apart">
      <ActionIcon
        variant="outline"
        color={dark ? 'yellow' : 'blue'}
        onClick={() => toggleColorScheme()}
        title="Toggle color scheme"
      >
        {dark ? <Sun size={18} /> : <MoonStars size={18} />}
      </ActionIcon>
      <Group>
        <Link to={'/'}>Home</Link>
        {isLoggedIn ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <>
            <Link to={'/login'}>Login</Link>
            <Link to={'/signup'}>Sign up</Link>
          </>
        )}
      </Group>
    </Group>
  )
}

export default Header
