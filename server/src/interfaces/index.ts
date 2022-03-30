export interface User {
  username: string
  email: string
  password: string
}

export interface Todo {
  user: User
  text: string
  completed: boolean
}
