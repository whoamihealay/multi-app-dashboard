import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TodoInput from '../components/todos/TodoInput'
import TodosApp from '../components/todos/TodosApp'
import TodosList from '../components/todos/TodosList'
import { IUser, Todo } from '../interfaces'

interface IProps {
  user: IUser
}

const Dashboard = ({ user }: IProps) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (user && !user._id) {
      navigate('/login')
    }
  }, [user])

  return (
    <>
      <h1>Dashboard</h1>
      <TodosApp user={user} />
    </>
  )
}

export default Dashboard
