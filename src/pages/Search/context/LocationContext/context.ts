import { createContext, useContext } from "react";

export type TLocation = {
  address: string;
  coords: string;
  id: string;
};
type TLocationContext = {
  location: TLocation | null;
  loading: boolean;
  error: Error | null;
};
export const LocationContext = createContext<TLocationContext | null>(null);

export const useLocation = () => {
  const value = useContext(LocationContext);
  if (!value)
    throw new Error("Location context can only be used within its provider");
  return value;
};
