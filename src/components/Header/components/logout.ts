import { User } from "../../UserProvider/IUser"
import { apiUrl } from "../../../apiUrl"
export const logout = async (setUser: React.Dispatch<React.SetStateAction<User | null>>) => {
  const res = await fetch(`${apiUrl}/api/v1/logout`, { credentials: 'include' })
  if (res.status === 200) setUser(null)
  return
}