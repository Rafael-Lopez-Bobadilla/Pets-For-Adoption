import s from "./Filters.module.css";
import Select from "../Select/Select";
import BreedsFilter from "./BreedsFilter/BreedsFilter";
import { usePetTypes } from "../../context/PetTypesContext/context";
import Autocomplete from "../Autocomplete/Autocomplete";
import { useSearchParams } from "react-router-dom";
const Filters = () => {
  const { types } = usePetTypes();
  const [params] = useSearchParams();
  const selected = types?.find(
    (type) => params.get("type")?.toLowerCase() === type.name.toLowerCase()
  );
  return (
    <>
      {selected && (
        <>
          <div className={s.filter}>
            <BreedsFilter selected={selected} />
          </div>
          {selected.coats.length > 0 && (
            <div className={s.filter}>
              <span>Coats</span>
              <Select options={["Any", ...selected.coats]} field="coat" />
            </div>
          )}
          {selected.colors.length > 0 && (
            <div className={s.filter}>
              <span>Colors</span>
              <Autocomplete
                options={["Any", ...selected.colors]}
                field="color"
              />
            </div>
          )}
          {selected.genders.length > 0 && (
            <div className={s.filter}>
              <span>Genders</span>
              <Select options={["Any", ...selected.genders]} field="gender" />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Filters;
