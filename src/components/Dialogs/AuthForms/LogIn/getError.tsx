import { AxiosError } from "axios";
type error = {
  key: "email" | "password";
  message: string;
} | null;
export const getError = (err: unknown): error => {
  if (err instanceof AxiosError && err.response?.status === 401) {
    if (err.response.data === "email") {
      const message = "An account with this email does not exists";
      return { key: "email", message };
    }
    if (err.response.data === "password") {
      const message = "Incorrect password";
      return { key: "password", message };
    }
  }
  return null;
};
