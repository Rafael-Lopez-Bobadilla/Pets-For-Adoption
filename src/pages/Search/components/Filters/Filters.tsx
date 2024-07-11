import s from "./Filters.module.css";
import Select from "../Select/Select";
import BreedsFilter from "./BreedsFilter/BreedsFilter";
import { usePetTypes } from "../../../../context/PetTypesContext/context";
import Autocomplete from "../Autocomplete/Autocomplete";
import { useMemo } from "react";
import { CircularProgress } from "@mui/material";
import LoadError from "../../../../components/LoadError/LoadError";
import { filtersData } from "./filtersData";
import { useValidParams } from "../../context/ValidParamsContext/context";
const Filters = () => {
  const { types, loading, error, retry } = usePetTypes();
  const { params } = useValidParams();
  const selected = useMemo(
    () =>
      types?.find(
        (type) => params?.type.toLowerCase() === type.name.toLowerCase()
      ),
    [params?.type, types]
  );
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
            <BreedsFilter selected={selected} />
          </div>
          {filtersData.map((filter) => {
            if (selected[filter.selectedKey].length > 0)
              return (
                <div className={s.filter} key={filter.paramId}>
                  <span>{filter.label}</span>
                  {selected[filter.selectedKey].length < 10 ? (
                    <Select
                      options={selected[filter.selectedKey]}
                      paramValue={params?.[filter.paramId]}
                      field={filter.paramId}
                    />
                  ) : (
                    <Autocomplete
                      options={selected[filter.selectedKey]}
                      paramValue={params?.[filter.paramId]}
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
