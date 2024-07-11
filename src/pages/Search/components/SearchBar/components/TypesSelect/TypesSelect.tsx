import Select from "../../../Select/Select";
import { usePetTypes } from "../../../../../../context/PetTypesContext/context";
import { CircularProgress } from "@mui/material";
import s from "./TypesSelect.module.css";
import { useMemo } from "react";
import { useValidParams } from "../../../../context/ValidParamsContext/context";
const TypesSelect = () => {
  const { types, loading } = usePetTypes();
  const { params } = useValidParams();
  const names = useMemo(() => types?.map((type) => type.name) || null, [types]);
  if (loading)
    return (
      <div className={s.loading}>
        <CircularProgress size={20} />
      </div>
    );
  return (
    <Select
      options={names ? names : []}
      paramValue={params?.type}
      field="type"
    />
  );
};

export default TypesSelect;
