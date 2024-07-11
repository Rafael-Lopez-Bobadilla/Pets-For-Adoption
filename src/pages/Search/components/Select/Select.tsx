import {
  Select as SelectMui,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import s from "./Select.module.css";
import { memo } from "react";
import { useParamsUpdate } from "../../context/ValidParamsContext/updateContext";
import { TValidParams } from "../../context/ValidParamsContext/paramsSchema";
type SelectProps = {
  options: string[];
  paramValue: string | undefined;
  field: keyof TValidParams;
};
const Select = memo(({ options, paramValue, field }: SelectProps) => {
  const { changeParam, changeType, removeParam } = useParamsUpdate();
  const value = options.find(
    (option) => option.toLowerCase() == paramValue?.toLowerCase()
  );
  const onChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    if (field === "type") changeType(value);
    if (field !== "type") {
      if (value !== "Any") changeParam(value, field);
      if (value === "Any") removeParam(field);
    }
  };
  const completeOptions = field === "type" ? options : ["Any", ...options];
  return (
    <SelectMui
      onChange={onChange}
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
});

export default Select;
