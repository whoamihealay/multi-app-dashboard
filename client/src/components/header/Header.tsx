import { ActionIcon, Group, useMantineColorScheme } from '@mantine/core'
import { Link } from 'react-router-dom'
import { Sun, MoonStars } from 'tabler-icons-react'

const Header = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

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
        <Link to={'/login'}>Login</Link>
        <Link to={'/signup'}>Sign up</Link>
      </Group>
    </Group>
  )
}

export default Header
