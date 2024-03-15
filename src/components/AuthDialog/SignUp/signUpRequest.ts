import { SignUpSchema } from "./SignUp"
import { UseFormSetError } from "react-hook-form"
export const signUpRequest = async (data: SignUpSchema,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setError: UseFormSetError<SignUpSchema>) => {
  const { name, email, password } = data
  const res = await fetch('http://localhost:5002/api/v1/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
    headers: {
      "Content-Type": "application/json",
    }
  })
  const resData = await res.json()
  if (res.status === 201) setOpen(false)
  if (res.status === 400) setError('email', { message: resData.data.error })
}