import { useState, useEffect } from "react";
import { useLocation } from "../../../context/LocationContext/context";
export const useValue = () => {
  const [value, setValue] = useState("");
  const { location } = useLocation();
  useEffect(() => {
    if (location && location.address !== value) setValue(location.address);
    if (!location && value !== "") setValue("");
  }, [location]);
  const changeValue = (text: string) => setValue(text);
  return { value, changeValue };
};
