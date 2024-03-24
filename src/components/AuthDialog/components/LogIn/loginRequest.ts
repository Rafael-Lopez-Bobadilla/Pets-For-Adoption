import { LogInSchema } from "./LogIn"
import { UseFormSetError } from "react-hook-form"
import { apiUrl } from "../../../../apiUrl"
import { User } from "../../../UserProvider/IUser"
export const logInRequest = async (data: LogInSchema,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setError: UseFormSetError<LogInSchema>,
  setUser: React.Dispatch<React.SetStateAction<User | null>>) => {
  const { email, password } = data
  const res = await fetch(`${apiUrl}/api/v1/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    }
  })
  const resData = await res.json()
  if (res.status === 200) {
    setOpen(false)
    setUser(resData.user)
  }
  if (res.status === 401) {
    setError('email', { message: resData.error })
    setError('password', { message: resData.error })
  }
}