import { usePetfinderToken } from "../TokenContext/context";
import { getPetTypes } from "../../services/petfinderService/petfinderService";
import { useFetch } from "../../hooks/useFetch";
import { PetTypesContext } from "./context";
import { TPetTypesResponse } from "../../services/petfinderService/schemas/TypesSchema";

const PetTypesProvider = ({ children }: { children: React.ReactNode }) => {
  const { token } = usePetfinderToken();
  const enable = token ? true : false;
  const getData = () => {
    if (!token) return null;
    return getPetTypes(token);
  };
  const { data, loading, error, retry } = useFetch<TPetTypesResponse>(
    getData,
    enable
  );
  const types = data?.types || null;

  return (
    <PetTypesContext.Provider value={{ types, loading, error, retry }}>
      {children}
    </PetTypesContext.Provider>
  );
};

export default PetTypesProvider;
