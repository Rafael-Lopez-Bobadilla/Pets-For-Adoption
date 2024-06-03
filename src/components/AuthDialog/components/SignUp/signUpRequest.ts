import { SignUpSchema } from "./SignUp";
import { UseFormSetError } from "react-hook-form";
import { User } from "../../../UserProvider/UserProvider";
export const signUpRequest = async (
  data: SignUpSchema,
  closeDialog: () => void,
  setError: UseFormSetError<SignUpSchema>,
  updateUser: (user: User) => void
) => {
  const { name, email, password } = data;
  const res = await fetch(`${import.meta.env.VITE_API}/api/v1/signup`, {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const resData = await res.json();
  if (res.status === 201) {
    closeDialog();
    updateUser(resData.user);
  }
  if (res.status === 400) setError("email", { message: resData.error });
};
