import { createContext, useContext } from "react";
import { TUserSchema } from "../../services/userService/schemas";
import {
  TSignUpSchema,
  TLogInSchema,
} from "../../services/userService/schemas";
import { TUpdateAction } from "../../services/userService/userService";
type TUserContext = {
  user: TUserSchema | null;
  loading: boolean;
  error: boolean;
  signup: (data: TSignUpSchema) => void;
  login: (data: TLogInSchema) => void;
  logout: () => void;
  authWithGoogle: (token: string) => void;
  updateFavorites: (id: number, action: TUpdateAction) => void;
  clearUser: () => void;
};
export const UserContext = createContext<TUserContext | null>(null);
export const useUser = () => {
  const value = useContext(UserContext);
  if (!value)
    throw new Error("user context can only be used within its provider");
  return value;
};
