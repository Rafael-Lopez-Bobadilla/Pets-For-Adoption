import { usePetfinderToken } from "../../../../context/TokenContext/context";
import { getPetTypes } from "../../../../services/petfinderService/petfinderService";
import { useFetch } from "../../../../useFetch";
import { PetTypesContext, TPetTypesResponse } from "./context";

const PetTypesProvider = ({ children }: { children: React.ReactNode }) => {
  const { token } = usePetfinderToken();
  const enable = token ? true : false;
  const getData = () => {
    if (!token) return null;
    return getPetTypes(token);
  };
  const { data, loading, error } = useFetch<TPetTypesResponse>(getData, enable);
  const types = data?.types || null;

  return (
    <PetTypesContext.Provider value={{ types, loading, error }}>
      {children}
    </PetTypesContext.Provider>
  );
};

export default PetTypesProvider;
