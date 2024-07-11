import { Autocomplete as AutocompleteMui } from "@mui/material";
import { TextField } from "@mui/material";
import s from "./Autocomplete.module.css";
import { memo } from "react";
import { useParamsUpdate } from "../../context/ValidParamsContext/updateContext";
import { TValidParams } from "../../context/ValidParamsContext/paramsSchema";
type AutocompleteProps = {
  options: string[];
  paramValue: string | undefined;
  field: keyof TValidParams;
};
const Autocomplete = memo(
  ({ options, paramValue, field }: AutocompleteProps) => {
    const { changeParam, removeParam } = useParamsUpdate();
    const value = options.find(
      (option) => option.toLowerCase() == paramValue?.toLowerCase()
    );
    const onChange = (
      _e: React.SyntheticEvent<Element, Event>,
      value: string
    ) => {
      if (value !== "Any") changeParam(value, field);
      if (value === "Any") removeParam(field);
    };
    const completeOptions = ["Any", ...options];
    return (
      <AutocompleteMui
        options={completeOptions}
        blurOnSelect={true}
        value={value ? value : completeOptions[0]}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} />}
        disableClearable
        className={s.autocomplete}
      />
    );
  }
);

export default Autocomplete;
