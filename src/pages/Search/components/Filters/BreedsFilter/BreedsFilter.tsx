import Autocomplete from "../../Autocomplete/Autocomplete";
import { useQuery } from "@tanstack/react-query";
import { TSelectedType } from "../../../../../services/petfinderService/schemas/TypesSchema";
import { getBreeds } from "../../../../../services/petfinderService/petfinderService";
import { usePetfinderToken } from "../../../../../context/TokenContext/context";

const BreedsFilter = ({ selected }: { selected: TSelectedType | null }) => {
  const { token } = usePetfinderToken();
  const getData = () => {
    if (!selected || !token) throw new Error("token or selected not ready");
    return getBreeds(token, selected._links.breeds.href);
  };
  const { data } = useQuery({
    queryKey: [selected?.name],
    queryFn: () => getData(),
  });
  const breeds = data?.breeds.map((breed) => breed.name);
  return (
    <>
      <span>Breeds</span>
      {breeds && <Autocomplete options={breeds} paramKey="breed" />}
    </>
  );
};

export default BreedsFilter;
