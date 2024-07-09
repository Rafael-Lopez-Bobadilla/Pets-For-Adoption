import { createContext, useContext } from "react";
type TSnackbarcontext = {
  showSnackbar: (text: string) => void;
};
export const SnackbarContext = createContext<TSnackbarcontext | null>(null);

export const useSnackbar = () => {
  const value = useContext(SnackbarContext);
  if (!value)
    throw new Error("Snackbar context can only be used within its provider");
  return value;
};
