import { AxiosError } from "axios";
import { TLogInSchema } from "../../../../services/userService/schemas";
import { UseFormSetError } from "react-hook-form";
export const handleError = (
  err: unknown,
  setError: UseFormSetError<TLogInSchema>,
  showError: (text: string) => void
) => {
  if (err instanceof AxiosError && err.response?.status === 401) {
    const key = err.response.data;
    if (key === "email") {
      const message = "An account with this email does not exists";
      setError("email", { message });
    }
    if (key === "password") {
      const message = "Incorrect password";
      setError("password", { message });
    }
    return;
  }
  showError("Unsuccessful Log In");
};
