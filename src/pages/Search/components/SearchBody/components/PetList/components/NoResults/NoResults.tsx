import s from "./NoResults.module.css";
import { useValidParams } from "../../../../../../context/ValidParamsContext/context";
const NoResults = () => {
  const { params, removeParam, clearFilters } = useValidParams();
  let filtersExists = false;
  if (params?.breed || params?.coat || params?.gender || params?.color)
    filtersExists = true;
  return (
    <h2 className={s.alert}>
      {"No results matching your criteria. Consider "}
      {params?.location && (
        <span>
          {"looking for pets "}
          <span onClick={() => removeParam("location")} className={s.link}>
            anywhere in North America
          </span>
          {filtersExists && " or "}
        </span>
      )}
      {filtersExists && (
        <span onClick={clearFilters} className={s.link}>
          clearing the filters
        </span>
      )}
    </h2>
  );
};

export default NoResults;
