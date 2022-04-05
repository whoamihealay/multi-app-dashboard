export interface IUser {
  _id?: string
  username?: string
  email?: string
  isFetching: boolean
  error?: any
}

export interface Todo {
  _id: string
  user: string
  text: string
  completed: boolean
  createdAt: string
  updatedAt: string
}
