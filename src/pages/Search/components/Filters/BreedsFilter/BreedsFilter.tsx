import Autocomplete from "../../Autocomplete/Autocomplete";
import { useQuery } from "@tanstack/react-query";
import { SelectedTypeSchema } from "../../../../../services/petfinderService/schemas/TypesSchema";
import { z } from "zod";
import { getBreeds } from "../../../../../services/petfinderService/petfinderService";
import { usePetfinderToken } from "../../../../../context/TokenContext/context";
import { memo } from "react";
type TSelected = z.infer<typeof SelectedTypeSchema>;
type Props = {
  selected: TSelected | null;
  paramValue: string | null;
  onChange: (value: string, field: string) => void;
};
const BreedsFilter = memo(({ selected, paramValue, onChange }: Props) => {
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
      {breeds && (
        <Autocomplete
          options={breeds}
          paramValue={paramValue}
          onChange={onChange}
          field="breed"
        />
      )}
    </>
  );
});

export default BreedsFilter;
