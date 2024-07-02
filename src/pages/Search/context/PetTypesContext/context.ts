import { createContext, useContext } from "react";
import { z } from "zod";
import { TypesSchema } from "../../../../services/petfinderService/schemas/TypesSchema";

export type TPetTypesResponse = z.infer<typeof TypesSchema>;
type TPetTypes = z.infer<typeof TypesSchema.shape.types>;
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
