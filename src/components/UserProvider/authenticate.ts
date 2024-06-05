import { User } from "./UserProvider";
import { NavigateFunction } from "react-router-dom";
export type UserApiRes = {
  status: "success" | "fail";
  error?: string;
  user?: User;
};
export const authenticate = async (
  updateUser: (user: User) => void,
  navigate: NavigateFunction,
  pathname: string
) => {
  const res = await fetch(`${import.meta.env.VITE_API}/api/v1/authenticate`, {
    credentials: "include",
  });
  const data: UserApiRes = await res.json();
  if (data.user) updateUser(data.user);
  if (
    (!data.user || data.user.favorites.length === 0) &&
    pathname === "/favorites"
  )
    navigate("/search");
};
