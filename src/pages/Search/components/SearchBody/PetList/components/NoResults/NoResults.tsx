import s from "./NoResults.module.css";
import { useSearchParams } from "react-router-dom";
import { clearFilters, clearLocation } from "../../utils/clearingEvents";
import { useLocation } from "../../../../../context/LocationContext/context";
const NoResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { location, updateLocation } = useLocation();
  const filtersExists = () => {
    if (
      searchParams.size > 3 ||
      (searchParams.size > 2 && !searchParams.has("location"))
    ) {
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
            <a onClick={() => clearLocation(updateLocation, setSearchParams)}>
              Anywhere in North America
            </a>
          </span>
          {filtersExists() && " or "}
        </>
      )}
      {filtersExists() && (
        <a onClick={() => clearFilters(searchParams, setSearchParams)}>
          Clearing the filters
        </a>
      )}
    </h2>
  );
};

export default NoResults;
