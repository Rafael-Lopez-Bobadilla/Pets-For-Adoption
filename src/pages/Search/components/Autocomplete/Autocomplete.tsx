import { Autocomplete as AutocompleteMui } from "@mui/material";
import { TextField } from "@mui/material";
import s from "./Autocomplete.module.css";
import { useMemo } from "react";
import { TParamKey } from "../../utils/paramsSchema";
import { useValidParams } from "../../context/ValidParamsContext/context";
type AutocompleteProps = {
  options: string[];
  paramKey: TParamKey;
};
const Autocomplete = ({ options, paramKey }: AutocompleteProps) => {
  const { changeParam, removeParam, params } = useValidParams();
  const handleChange = (
    _e: React.SyntheticEvent<Element, Event>,
    value: string
  ) => {
    if (value !== "Any") changeParam(paramKey, value);
    if (value === "Any") removeParam(paramKey);
  };
  const value = useMemo(
    () =>
      options.find(
        (option) => option.toLowerCase() == params?.[paramKey]?.toLowerCase()
      ),
    [params?.[paramKey]]
  );
  const completeOptions = ["Any", ...options];
  return (
    <AutocompleteMui
      options={completeOptions}
      blurOnSelect={true}
      value={value ? value : completeOptions[0]}
      onChange={handleChange}
      renderInput={(params) => <TextField {...params} />}
      disableClearable
      className={s.autocomplete}
    />
  );
};

export default Autocomplete;
