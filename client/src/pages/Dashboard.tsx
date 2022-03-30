import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IUser } from '../interfaces'

interface IProps {
  user: IUser
}

const Dashboard = ({ user }: IProps) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (user && !user._id) {
      navigate('/')
    }
  })

  return (
    <>
      <h1>Dashboard</h1>
    </>
  )
}

export default Dashboard
