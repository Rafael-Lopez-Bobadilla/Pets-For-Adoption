import Select from "../../../Select/Select";
import { usePetTypes } from "../../../../context/PetTypesContext/context";
import { CircularProgress } from "@mui/material";
import s from "./TypesSelect.module.css";
import { useSearchParams } from "react-router-dom";
import { useCallback, useMemo } from "react";
const TypesSelect = () => {
  const { types, loading } = usePetTypes();
  const [params, setParams] = useSearchParams();
  const names = useMemo(() => types?.map((type) => type.name) || null, [types]);
  const onChange = useCallback((value: string) => {
    const newParams = new URLSearchParams(params);
    newParams.set("type", value);
    setParams(newParams);
  }, []);
  if (loading)
    return (
      <div className={s.loading}>
        <CircularProgress size={20} />
      </div>
    );
  return (
    <Select
      options={names ? names : []}
      paramValue={params.get("type")}
      onChange={onChange}
      field="type"
    />
  );
};

export default TypesSelect;
