import { useState, createContext, useEffect } from "react"
import { User, IUserContext } from './IUser'
const UserContext = createContext<IUserContext>({ user: null, setUser: () => { } })
const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const authenticate = async () => {
    const res = await fetch('http://localhost:5002/api/v1/authenticate', {
      credentials: 'include'
    })
    const data = await res.json()
    if (data?.user) setUser(data.user)
  }
  useEffect(() => {
    authenticate()
  }, [])
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider