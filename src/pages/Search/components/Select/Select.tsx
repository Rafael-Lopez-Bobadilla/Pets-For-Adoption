import { Select as SelectMui, MenuItem } from "@mui/material";
import s from "./Select.module.css";
import { useMemo } from "react";
import { TParamKey } from "../../utils/paramsSchema";
import { SelectChangeEvent } from "@mui/material";
import { useValidParams } from "../../context/ValidParamsContext/context";
type SelectProps = {
  options: string[];
  paramKey: TParamKey;
};
const Select = ({ options, paramKey }: SelectProps) => {
  const { changeParam, changeType, removeParam, params } = useValidParams();
  const value = useMemo(
    () =>
      options.find(
        (option) => option.toLowerCase() == params?.[paramKey]?.toLowerCase()
      ),
    [params?.[paramKey]]
  );
  const handleChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    if (paramKey === "type") changeType(value);
    if (paramKey !== "type") {
      if (value !== "Any") changeParam(paramKey, value);
      if (value === "Any") removeParam(paramKey);
    }
  };
  const completeOptions = paramKey === "type" ? options : ["Any", ...options];
  return (
    <SelectMui
      onChange={handleChange}
      fullWidth
      className={s.select}
      value={value ? value : completeOptions[0]}
    >
      {completeOptions.map((option) => (
        <MenuItem value={option} key={option}>
          {option}
        </MenuItem>
      ))}
    </SelectMui>
  );
};

export default Select;
