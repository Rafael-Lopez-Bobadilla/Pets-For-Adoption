import { LogInSchema } from "./LogIn"
import { UseFormSetError } from "react-hook-form"
export const logInRequest = async (data: LogInSchema,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setError: UseFormSetError<LogInSchema>) => {
  const { email, password } = data
  const res = await fetch('http://localhost:5002/api/v1/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    }
  })
  const resData = await res.json()
  if (res.status === 200) setOpen(false)
  if (res.status === 401) {
    setError('email', { message: resData.data.error })
    setError('password', { message: resData.data.error })
  }
}