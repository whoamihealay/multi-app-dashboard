import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { toast } from 'react-toastify'

type User = {
  _id?: string
  isFetching?: boolean
  error?: any
}

export type credendials = {
  username: string
  email?: string
  password: FunctionStringCallback
}

const Router = () => {
  const [user, setUser] = useState<User>({
    isFetching: true
  })

  const register = async (credentials: credendials) => {
    try {
      const { data } = await axios.post('/auth/register', credentials)
      await localStorage.setItem('todo-token', data.token)
      await localStorage.setItem('user', JSON.stringify(data))
      setUser(data)
    } catch (error: any) {
      console.log(error)
      setUser({ error: error.response.data.error || 'Server Error' })
    }
  }

  const login = async (credentials: credendials) => {
    try {
      const { data } = await axios.post('/auth/login', credentials)
      await localStorage.setItem('todo-token', data.token)
      await localStorage.setItem('user', JSON.stringify(data))
      setUser(data)
    } catch (error: any) {
      console.log(error)
      setUser({ error: error.response.data.error || 'Server Error' })
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      setUser((prev) => ({ ...prev, isFetching: true }))
      try {
        const { data } = await axios.get('/auth/user')
        setUser(data)
      } catch (error) {
        console.log(error)
      } finally {
        setUser((prev) => ({ ...prev, isFetching: false }))
      }
    }
    fetchUser()
  }, [])

  useEffect(() => {
    if (user.error) {
      if (typeof user.error === 'string') {
        toast.error(user.error)
      } else {
        toast.error('Internal Server Error. Please try again')
      }
    }
  }, [user.error])

  return user.isFetching ? (
    <div>Loading...</div>
  ) : (
    <Routes>
      <Route path="/login" element={<Login login={login} />} />
      <Route path="/signup" element={<Signup register={register} />} />
      <Route
        path="/"
        element={user._id ? <Dashboard /> : <Login login={login} />}
      />
    </Routes>
  )
}

export default Router
