import Select from "../../../Select/Select";
import { usePetTypes } from "../../../../../../context/PetTypesContext/context";
import { CircularProgress } from "@mui/material";
import s from "./TypesSelect.module.css";
import { useMemo } from "react";
const TypesSelect = () => {
  const { types, loading } = usePetTypes();
  const names = useMemo(() => types?.map((type) => type.name) || null, [types]);
  if (loading)
    return (
      <div className={s.loading}>
        <CircularProgress size={20} />
      </div>
    );
  return <Select options={names ? names : []} paramKey="type" />;
};

export default TypesSelect;
