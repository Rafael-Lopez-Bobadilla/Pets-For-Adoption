import s from "./NoResults.module.css";
import { useLocation } from "../../../../../../context/LocationContext/context";
import { useValidParams } from "../../../../../../context/ValidParamsContext/context";
const NoResults = () => {
  const { params, removeParam, clearFilters } = useValidParams();
  const { location } = useLocation();
  let filtersExists = false;
  if (params?.breed || params?.coat || params?.gender || params?.color)
    filtersExists = true;
  return (
    <h2 className={s.alert}>
      No results matching your criteria. Consider{" "}
      {location && (
        <>
          <span>
            {" "}
            looking for pets{" "}
            <a onClick={() => removeParam("location")}>
              Anywhere in North America
            </a>
          </span>
          {filtersExists && " or "}
        </>
      )}
      {filtersExists && <a onClick={clearFilters}>Clearing the filters</a>}
    </h2>
  );
};

export default NoResults;
