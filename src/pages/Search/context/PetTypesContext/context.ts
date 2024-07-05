import { createContext, useContext } from "react";
import { TPetTypes } from "../../../../services/petfinderService/schemas/TypesSchema";

type TPetTypesContext = {
  types: TPetTypes | null;
  loading: boolean;
  error: boolean;
};
export const PetTypesContext = createContext<TPetTypesContext | null>(null);

export const usePetTypes = () => {
  const value = useContext(PetTypesContext);
  if (!value)
    throw new Error("Pet Types context can only be used within its provider");
  return value;
};
