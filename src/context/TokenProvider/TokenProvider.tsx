import { createContext, useContext } from "react";
import { useFetch } from "../../useFetch";
import { TTokenSchema, getToken } from "../../services/petfinderService";
type TTokenContext = {
  token: string | null;
  loading: boolean;
  error: boolean;
};
const TokenContext = createContext<TTokenContext | null>(null);
export const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, loading, error } = useFetch<TTokenSchema>(getToken);
  const token = data?.access_token || null;
  return (
    <TokenContext.Provider value={{ token, loading, error }}>
      {children}
    </TokenContext.Provider>
  );
};

export const usePetfinderToken = () => {
  const token = useContext(TokenContext);
  if (!token)
    throw new Error("Token context has to be used within its provider");
  return token;
};
