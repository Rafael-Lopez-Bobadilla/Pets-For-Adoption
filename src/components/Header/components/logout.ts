import { User } from "../../UserProvider/IUser"
export const logout = async (setUser: React.Dispatch<React.SetStateAction<User | null>>) => {
  const res = await fetch(`${import.meta.env.VITE_API}/api/v1/logout`, { credentials: 'include' })
  if (res.status === 200) setUser(null)
  return
}