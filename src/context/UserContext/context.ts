import { createContext, useContext } from "react";
import { UserSchema } from "../../services/userService";
import { z } from "zod";
export type TUserSchema = z.infer<typeof UserSchema>;
export type User = TUserSchema | null;
type TUserContext = {
  user: User;
  updateUser: (data: User) => void;
  loading: boolean;
  error: boolean;
};
export const UserContext = createContext<TUserContext | null>(null);

export const useUser = () => {
  const userContext = useContext(UserContext);
  if (!userContext)
    throw new Error("user context has to be used within its provider");
  return userContext;
};
