import Select from "../../../Select/Select";
import { usePetTypes } from "../../../../context/PetTypesContext/context";
const TypesSelect = () => {
  const { types } = usePetTypes();
  const names = types?.map((type) => type.name) || null;
  return <>{names && <Select options={names} field="type" />}</>;
};

export default TypesSelect;
