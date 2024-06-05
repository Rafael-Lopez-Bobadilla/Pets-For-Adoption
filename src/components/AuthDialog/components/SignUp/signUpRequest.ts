import { SignUpSchema } from "./SignUp";
import { UseFormSetError } from "react-hook-form";
import { User } from "../../../UserProvider/UserProvider";
import { UserApiRes } from "../../../UserProvider/authenticate";
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
  const resData: UserApiRes = await res.json();
  if (resData.user) {
    closeDialog();
    updateUser(resData.user);
  }
  if (!resData.user) setError("email", { message: resData.error });
};
