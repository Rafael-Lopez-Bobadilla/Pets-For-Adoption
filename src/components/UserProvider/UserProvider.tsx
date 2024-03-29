import { useState, createContext, useEffect } from "react"
import { User, IUserContext } from './IUser'
import { useNavigate } from 'react-router-dom'
export const UserContext = createContext<IUserContext>({ user: null, setUser: () => { } })
const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()
  const authenticate = async () => {
    const res = await fetch(`${import.meta.env.VITE_API}/api/v1/authenticate`, {
      credentials: 'include'
    })
    const data = await res.json()
    if (data?.user) setUser(data.user)
    if ((!data?.user || data?.user.favorites.length === 0) && location.pathname === '/favorites')
      navigate('/search')
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