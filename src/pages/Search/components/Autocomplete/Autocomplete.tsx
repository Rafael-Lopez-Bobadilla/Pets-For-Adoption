import AutocompleteMui from "./AutocompleteMui";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
type AutocompleteProps = {
  options: string[];
  field: string;
};
const Autocomplete = ({ options, field }: AutocompleteProps) => {
  const [params, setParams] = useSearchParams();
  const [value, setValue] = useState(options[0]);
  const onChange = useCallback((_e: any, newValue: string | null) => {
    let newParams = new URLSearchParams(location.search);
    if (newValue === "Any") newParams.delete(field);
    if (newValue !== "Any" && newValue) newParams.set(field, newValue);
    newParams.set("page", "1");
    setParams(newParams);
  }, []);
  useEffect(() => {
    const paramsValue = params.get(field)?.toLowerCase();
    if (!params.has(field) && value !== options[0]) setValue(options[0]);
    if (params.has(field) && paramsValue !== value.toLowerCase()) {
      const newValue = options.find(
        (option) => option.toLowerCase() == params.get(field)?.toLowerCase()
      );
      if (newValue) setValue(newValue);
    }
  }, [params]);
  return (
    <AutocompleteMui value={value} options={options} onChange={onChange} />
  );
};

export default Autocomplete;
