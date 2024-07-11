import { Autocomplete as AutocompleteMui } from "@mui/material";
import { TextField } from "@mui/material";
import s from "./Autocomplete.module.css";
import { memo } from "react";
type AutocompleteProps = {
  options: string[];
  paramValue: string | null;
  onChange: (value: string, field: string) => void;
  field: string;
};
const Autocomplete = memo(
  ({ options, paramValue, onChange, field }: AutocompleteProps) => {
    const value = options.find(
      (option) => option.toLowerCase() == paramValue?.toLowerCase()
    );
    const completeOptions = ["Any", ...options];
    return (
      <AutocompleteMui
        options={completeOptions}
        blurOnSelect={true}
        value={value ? value : completeOptions[0]}
        onChange={(_e, value) => onChange(value, field)}
        renderInput={(params) => <TextField {...params} />}
        disableClearable
        className={s.autocomplete}
      />
    );
  }
);

export default Autocomplete;
