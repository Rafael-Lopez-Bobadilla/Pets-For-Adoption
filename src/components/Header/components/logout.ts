import { User } from "../../UserProvider/UserProvider";
export const logout = async (updateUser: (user: User) => void) => {
  const res = await fetch(`${import.meta.env.VITE_API}/api/v1/logout`, {
    credentials: "include",
  });
  if (res.status === 200) updateUser(null);
  return;
};
