import { SignUpSchema } from "./SignUp"
import { UseFormSetError } from "react-hook-form"
import { apiUrl } from "../../../../apiUrl"
import { User } from "../../../UserProvider/IUser"
export const signUpRequest = async (data: SignUpSchema,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setError: UseFormSetError<SignUpSchema>,
  setUser: React.Dispatch<React.SetStateAction<User | null>>) => {
  const { name, email, password } = data
  const res = await fetch(`${apiUrl}/api/v1/signup`, {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include'
  })
  const resData = await res.json()
  if (res.status === 201) {
    setOpen(false)
    setUser(resData.user)
  }
  if (res.status === 400) setError('email', { message: resData.error })
}