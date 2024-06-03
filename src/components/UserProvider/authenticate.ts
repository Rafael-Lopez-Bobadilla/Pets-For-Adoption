import { User } from "./UserProvider";
import { NavigateFunction } from "react-router-dom";
export const authenticate = async (
  updateUser: (user: User) => void,
  navigate: NavigateFunction
) => {
  const res = await fetch(`${import.meta.env.VITE_API}/api/v1/authenticate`, {
    credentials: "include",
  });
  const data = await res.json();
  if (data?.user) updateUser(data.user);
  if (
    (!data?.user || data?.user.favorites.length === 0) &&
    location.pathname === "/favorites"
  )
    navigate("/search");
};
