import { LogInSchema } from "./LogIn";
import { UseFormSetError } from "react-hook-form";
import { User } from "../../../UserProvider/UserProvider";
import { UserApiRes } from "../../../UserProvider/authenticate";
export const logInRequest = async (
  formData: LogInSchema,
  closeDialog: () => void,
  setError: UseFormSetError<LogInSchema>,
  updateUser: (user: User) => void
) => {
  const { email, password } = formData;
  const res = await fetch(`${import.meta.env.VITE_API}/api/v1/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data: UserApiRes = await res.json();
  if (data.user) {
    closeDialog();
    updateUser(data.user);
  }
  if (!data.user) {
    setError("email", { message: data.error });
    setError("password", { message: data.error });
  }
};
