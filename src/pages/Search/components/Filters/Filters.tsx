import s from "./Filters.module.css";
import Select from "../Select/Select";
import BreedsFilter from "./BreedsFilter/BreedsFilter";
import { usePetTypes } from "../../context/PetTypesContext/context";
import Autocomplete from "../Autocomplete/Autocomplete";
import { useSearchParams } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { CircularProgress } from "@mui/material";
import LoadError from "../../../../components/LoadError/LoadError";
import { filtersData } from "./filtersData";
const Filters = () => {
  const { types, loading, error, retry } = usePetTypes();
  const [params, setParams] = useSearchParams();
  const selected = useMemo(
    () =>
      types?.find(
        (type) => params.get("type")?.toLowerCase() === type.name.toLowerCase()
      ),
    [params.get("type"), types]
  );
  const onChange = useCallback((value: string, field: string) => {
    const newParams = new URLSearchParams(params);
    if (value === "Any") newParams.delete(field);
    if (value !== "Any") newParams.set(field, value);
    setParams(newParams);
  }, []);
  if (loading)
    return (
      <div className={s.loading}>
        <CircularProgress size={30} />
      </div>
    );
  if (error)
    return <LoadError message="Unable to get pet types info" retry={retry} />;
  return (
    <>
      {selected && (
        <>
          <div className={s.filter}>
            <BreedsFilter
              selected={selected}
              paramValue={params.get("breed")}
              onChange={onChange}
            />
          </div>
          {filtersData.map((filter) => {
            if (selected[filter.selectedKey].length > 0)
              return (
                <div className={s.filter} key={filter.paramId}>
                  <span>{filter.label}</span>
                  {selected[filter.selectedKey].length < 10 ? (
                    <Select
                      options={selected[filter.selectedKey]}
                      paramValue={params.get(filter.paramId)}
                      onChange={onChange}
                      field={filter.paramId}
                    />
                  ) : (
                    <Autocomplete
                      options={selected[filter.selectedKey]}
                      paramValue={params.get(filter.paramId)}
                      onChange={onChange}
                      field={filter.paramId}
                    />
                  )}
                </div>
              );
          })}
        </>
      )}
    </>
  );
};

export default Filters;
