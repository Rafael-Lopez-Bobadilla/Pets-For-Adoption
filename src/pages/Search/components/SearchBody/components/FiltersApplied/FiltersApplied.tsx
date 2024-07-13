import s from "./FiltersApplied.module.css";
import { useSearchParams } from "react-router-dom";
import { TParamKey } from "../../../../utils/paramsSchema";
import { useParamsUpdate } from "../../../../hooks/useParamsUpdate";
import CloseIcon from "../../../../../../components/Icons/CloseIcon";
const options: TParamKey[] = ["breed", "coat", "color", "gender"];
const FiltersApplied = () => {
  const [params, _setParams] = useSearchParams();
  const { removeParam, clearFilters } = useParamsUpdate();
  const filters = options.filter((option) => params.has(option));
  if (filters.length > 0)
    return (
      <>
        <p className={s.label}>Filters Applied:</p>
        <div className={s.filters}>
          {filters.map((filter) => (
            <div className={s.filter} key={filter}>
              {params.get(filter)}
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
