import { useFetch } from "../../useFetch";
import { getToken } from "../../services/petfinderService/petfinderService";
import { TokenContext } from "./context";
import { TokenSchema } from "../../services/petfinderService/schemas/TokenSchema";
import { z } from "zod";
type TTokenSchema = z.infer<typeof TokenSchema>;
export const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, loading, error } = useFetch<TTokenSchema>(getToken);
  const token = data?.access_token || null;
  return (
    <TokenContext.Provider value={{ token, loading, error }}>
      {children}
    </TokenContext.Provider>
  );
};
