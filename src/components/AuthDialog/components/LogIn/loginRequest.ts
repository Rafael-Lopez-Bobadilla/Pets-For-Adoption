import { LogInSchema } from "./LogIn";
import { UseFormSetError } from "react-hook-form";
import { User } from "../../../UserProvider/UserProvider";
export const logInRequest = async (
  data: LogInSchema,
  closeDialog: () => void,
  setError: UseFormSetError<LogInSchema>,
  updateUser: (user: User) => void
) => {
  const { email, password } = data;
  const res = await fetch(`${import.meta.env.VITE_API}/api/v1/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const resData = await res.json();
  if (res.status === 200) {
    closeDialog();
    updateUser(resData.user);
  }
  if (res.status === 401) {
    setError("email", { message: resData.error });
    setError("password", { message: resData.error });
  }
};
