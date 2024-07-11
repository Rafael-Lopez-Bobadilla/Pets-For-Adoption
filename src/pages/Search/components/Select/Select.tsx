import { Select as SelectMui, MenuItem } from "@mui/material";
import s from "./Select.module.css";
import { memo } from "react";
type SelectProps = {
  options: string[];
  paramValue: string | null;
  field: string;
  onChange: (value: string, field: string) => void;
};
const Select = memo(({ options, paramValue, onChange, field }: SelectProps) => {
  const value = options.find(
    (option) => option.toLowerCase() == paramValue?.toLowerCase()
  );
  const completeOptions = field === "type" ? options : ["Any", ...options];
  return (
    <SelectMui
      onChange={(e) => onChange(e.target.value, field)}
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
