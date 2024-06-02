import { createContext, useState, useEffect } from "react";
import { getToken } from "./getToken";
export const TokenContext = createContext<string | null>(null);
export const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const getPetfinderToken = async () => {
    const accessToken = await getToken();
    setToken(accessToken);
  };
  useEffect(() => {
    getPetfinderToken();
  }, []);
  return (
    <TokenContext.Provider value={token}>{children}</TokenContext.Provider>
  );
};
