import { createContext, useContext } from "react";
type TTokenContext = {
  token: string | null;
  loading: boolean;
  error: boolean;
};
export const TokenContext = createContext<TTokenContext | null>(null);
export const usePetfinderToken = () => {
  const token = useContext(TokenContext);
  if (!token)
    throw new Error("Token context has to be used within its provider");
  return token;
};
