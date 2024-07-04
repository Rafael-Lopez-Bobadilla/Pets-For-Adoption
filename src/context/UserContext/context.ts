import { createContext, useContext } from "react";
import { TUserSchema } from "../../services/userService/schemas";
type TUserContext = {
  user: TUserSchema | null;
  loading: boolean;
  error: boolean;
};
export const UserContext = createContext<TUserContext | null>(null);
export const useUser = () => {
  const value = useContext(UserContext);
  if (!value)
    throw new Error("user context can only be used within its provider");
  return value;
};
