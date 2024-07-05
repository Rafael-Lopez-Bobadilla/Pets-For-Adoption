import s from "./NoResults.module.css";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "../../../../../context/LocationContext/context";
const NoResults = () => {
  const [params, setParams] = useSearchParams();
  const { location } = useLocation();
  const clearLocation = () => {
    params.delete("location");
    params.set("page", "1");
    setParams(new URLSearchParams(params));
  };
  const clearFilters = () => {
    const newParams = new URLSearchParams(params);
    newParams.delete("breed");
    newParams.delete("color");
    newParams.delete("coat");
    newParams.delete("gender");
    setParams(newParams);
  };
  const filtersExists = () => {
    if (params.size > 3 || (params.size > 2 && !params.has("location"))) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <h2 className={s.alert}>
      No results matching your criteria. Consider{" "}
      {location && (
        <>
          <span>
            {" "}
            looking for pets{" "}
            <a onClick={clearLocation}>Anywhere in North America</a>
          </span>
          {filtersExists() && " or "}
        </>
      )}
      {filtersExists() && <a onClick={clearFilters}>Clearing the filters</a>}
    </h2>
  );
};

export default NoResults;
