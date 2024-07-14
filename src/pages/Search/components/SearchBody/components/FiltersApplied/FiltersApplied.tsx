import s from "./FiltersApplied.module.css";
import { TParamKey } from "../../../../utils/paramsSchema";
import CloseIcon from "../../../../../../components/Icons/CloseIcon";
import { useValidParams } from "../../../../context/ValidParamsContext/context";
const options: TParamKey[] = ["breed", "coat", "color", "gender"];
const FiltersApplied = () => {
  const { removeParam, clearFilters, params } = useValidParams();
  const filters = options.filter((option) => params?.[option]);
  if (filters.length > 0)
    return (
      <>
        <p className={s.label}>Filters Applied:</p>
        <div className={s.filters}>
          {filters.map((filter) => (
            <div className={s.filter} key={filter}>
              {params?.[filter]}
              <div className={s.close} onClick={() => removeParam(filter)}>
                <CloseIcon color="white" width="15px" />
              </div>
            </div>
          ))}
          <div className={s.clear} onClick={clearFilters}>
            Clear all
          </div>
        </div>
      </>
    );
  return <></>;
};

export default FiltersApplied;
