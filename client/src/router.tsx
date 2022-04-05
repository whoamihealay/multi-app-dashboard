// Packages
import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

// Components
import Header from './components/header/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'

// Interfaces
import { IUser } from './interfaces'

export type credendials = {
  username: string
  email?: string
  password: FunctionStringCallback
}

const Router = () => {
  const [user, setUser] = useState<IUser>({
    isFetching: true
  })

  const navigate = useNavigate()

  const register = async (credentials: credendials) => {
    try {
      const { data } = await axios.post('/auth/register', credentials)
      await localStorage.setItem('user', JSON.stringify(data))
      setUser(data)
      if (user._id) {
        navigate('/')
      }
    } catch (error: any) {
      console.log(error)
      setUser({
        isFetching: false,
        error: error.response.data.error || 'Server Error'
      })
    } finally {
      if (user._id) {
        navigate('/')
      }
    }
  }

  const login = async (credentials: credendials) => {
    try {
      const { data } = await axios.post('/auth/login', credentials)
      await localStorage.setItem('user', JSON.stringify(data))
      setUser(data)
    } catch (error: any) {
      console.log(error.response.data.error)
      setUser({
        isFetching: false,
        error: error.response.data.error || 'Server Error'
      })
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser({ isFetching: false })
  }

  useEffect(() => {
    const fetchUser = async () => {
      console.log('Called')

      setUser((prev) => ({ ...prev, isFetching: true }))
      try {
        if (localStorage.getItem('user')) {
          const { data } = await axios.get('/auth/user')
          setUser(data)
        }
      } catch (error: any) {
        setUser({
          isFetching: false,
          error: error.response.data.error || 'Server Error'
        })
        localStorage.removeItem('user')
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

  return (
    <>
      <Header user={user} logout={logout} />
      {user.isFetching ? (
        <div>Loading...</div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login user={user} login={login} />} />
          <Route
            path="/signup"
            element={<Signup user={user} register={register} />}
          />
          <Route
            path="/"
            element={
              user._id ? (
                <Dashboard user={user} />
              ) : (
                <Login user={user} login={login} />
              )
            }
          />
          <Route path="/home" element={<Dashboard user={user} />} />
        </Routes>
      )}
    </>
  )
}

export default Router
