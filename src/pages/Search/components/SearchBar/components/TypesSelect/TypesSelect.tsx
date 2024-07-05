import Select from "../../../Select/Select";
import { usePetTypes } from "../../../../context/PetTypesContext/context";
const TypesSelect = ({ closeOverlay }: { closeOverlay?: () => void }) => {
  const { types } = usePetTypes();
  const names = types?.map((type) => type.name) || null;
  return (
    <>
      {names && (
        <Select options={names} field="type" closeOverlay={closeOverlay} />
      )}
    </>
  );
};

export default TypesSelect;
