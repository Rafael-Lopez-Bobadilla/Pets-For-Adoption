import { Autocomplete as AutocompleteMui } from "@mui/material";
import { TextField } from "@mui/material";
import s from "./Autocomplete.module.css";
import { useMemo } from "react";
import { TParamKey } from "../../utils/paramsSchema";
import { useSearchParams } from "react-router-dom";
import { useParamsUpdate } from "../../hooks/useParamsUpdate";
type AutocompleteProps = {
  options: string[];
  paramKey: TParamKey;
};
const Autocomplete = ({ options, paramKey }: AutocompleteProps) => {
  const [params] = useSearchParams();
  const { changeParam, removeParam } = useParamsUpdate();
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
        (option) => option.toLowerCase() == params.get(paramKey)?.toLowerCase()
      ),
    [params.get(paramKey)]
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
