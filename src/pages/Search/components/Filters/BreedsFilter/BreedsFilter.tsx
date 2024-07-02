import Autocomplete from "../../Autocomplete/Autocomplete";
import { useQuery } from "@tanstack/react-query";
import { SelectedTypeSchema } from "../../../../../services/petfinderService/schemas/TypesSchema";
import { BreedsSchema } from "../../../../../services/petfinderService/schemas/BreedsSchema";
import { z } from "zod";
import { getBreeds } from "../../../../../services/petfinderService/petfinderService";
import { usePetfinderToken } from "../../../../../context/TokenContext/context";
type TSelected = z.infer<typeof SelectedTypeSchema>;
type BreedsResponse = z.infer<typeof BreedsSchema>;
type Props = {
  closeOverlay?: () => void;
  selected: TSelected | null;
};
const BreedsFilter = ({ closeOverlay, selected }: Props) => {
  const { token } = usePetfinderToken();
  const getData = () => {
    if (!selected || !token) return undefined;
    return getBreeds(token, selected._links.breeds.href);
  };
  const { data } = useQuery<BreedsResponse | undefined>({
    queryKey: [selected?.name],
    queryFn: () => getData(),
  });
  const breeds = data?.breeds.map((breed) => breed.name);
  return (
    <>
      <span>Breeds</span>
      {breeds && (
        <Autocomplete
          options={["Any", ...breeds]}
          field="breed"
          closeOverlay={closeOverlay}
        />
      )}
    </>
  );
};

export default BreedsFilter;
