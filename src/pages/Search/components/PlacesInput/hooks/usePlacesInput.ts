import { useRef, useState } from "react";
import { useOptions } from "./useOptions";
import { useSearchParams } from "react-router-dom";
import { useValue } from "./useValue";
const ANY_ID = "Any";
const usePlacesInput = () => {
  const { loadError, setDefaultOption, setPredictions, clearOptions, options } =
    useOptions(ANY_ID);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useState(0);
  const { value, changeValue } = useValue();
  const [params, setParams] = useSearchParams();

  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (text === "") {
      setDefaultOption();
      setSelected(0);
    }
    setPredictions(text);
    changeValue(text);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let next = selected;
    if (e.code === "ArrowDown" && next < options.length - 1) next += 1;
    if (e.code === "ArrowUp" && next > 0) next -= 1;
    if (e.code === "Enter" && options.length > 0) {
      handleChange(options[selected].description, options[selected].place_id);
    }
    setSelected(next);
  };
  const handleChange = (value: string, id: string) => {
    clearOptions();
    inputRef.current?.blur();
    let newParams = new URLSearchParams(params);
    newParams.set("page", "1");
    if (id === ANY_ID) {
      changeValue("");
      newParams.delete("location");
      setParams(newParams);
      return;
    }
    changeValue(value);
    newParams.set("location", id);
    setParams(newParams);
  };
  return {
    value,
    options,
    selected,
    handleInput,
    handleKey,
    handleChange,
    inputRef,
    loadError,
  };
};

export default usePlacesInput;
