export type User = {
  email: string,
  name: string,
  favorites: string[]
}

export interface IUserContext {
  user: User | null,
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}