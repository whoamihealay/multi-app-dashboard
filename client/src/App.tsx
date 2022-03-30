import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme
} from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import axios, { AxiosRequestConfig } from 'axios'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Router from './router'
import { theme } from './themes/theme'

axios.interceptors.request.use(async (config: AxiosRequestConfig) => {
  if (localStorage.getItem('user')) {
    const user = JSON.parse(localStorage.getItem('user')!)
    const token = user.token
    config.headers!['x-access-token'] = token
  }
  return config
})

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light'
  })
  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={{ ...theme, colorScheme }}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
        <ToastContainer />
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
