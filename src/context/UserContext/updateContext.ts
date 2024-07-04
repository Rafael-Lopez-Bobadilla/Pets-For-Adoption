import { createContext, useContext } from "react";
import {
  TSignUpSchema,
  TLogInSchema,
} from "../../services/userService/schemas";
type TUserUpdateContext = {
  signup: (data: TSignUpSchema) => void;
  login: (data: TLogInSchema) => void;
  logout: () => void;
  authWithGoogle: (token: string) => void;
  updateFavorites: (id: number, action: string) => void;
};
export const UserUpdateContext = createContext<TUserUpdateContext | null>(null);
export const userUserUpdate = () => {
  const value = useContext(UserUpdateContext);
  if (!value)
    throw new Error("user update context can only be used within its provider");
  return value;
};
