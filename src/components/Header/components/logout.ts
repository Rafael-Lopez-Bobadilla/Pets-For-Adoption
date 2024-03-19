import { User } from "../../UserProvider/IUser"
export const logout = async (setUser: React.Dispatch<React.SetStateAction<User | null>>) => {
  const res = await fetch('http://localhost:5002/api/v1/logout', { credentials: 'include' })
  if (res.status === 200) setUser(null)
  return
}