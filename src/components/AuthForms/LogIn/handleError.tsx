import { AxiosError } from "axios";

export const handleError = (
  err: unknown,
  setError: (key: "email" | "password", message: string) => void
) => {
  if (err instanceof AxiosError && err.response?.status === 401) {
    if (err.response.data === "email") {
      const message = "An account with this email does not exists";
      setError("email", message);
    }
    if (err.response.data === "password") {
      const message = "Incorrect password";
      setError("password", message);
    }
  }
};
