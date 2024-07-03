import { useEffect, useRef, useState } from "react";
import { Place } from "./IPlace";
import { loadLibrary } from "../../../utils/loadLibrary";
import { getPredictions } from "./getPredictions";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "../../../context/LocationContext/context";
import { getLocationById } from "../../../../../services/placesService/placesService";
type service = google.maps.places.AutocompleteService;
const usePlacesInput = (closeOverlay?: () => void) => {
  const service = useRef<service>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [places, setPlaces] = useState<Place[] | []>([]);
  const [selected, setSelected] = useState(0);
  const [value, setValue] = useState("");
  const [params, setParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const timeoutID = useRef<any>(null);
  const { location, updateLocation } = useLocation();
  useEffect(() => {
    loadLibrary(service);
  }, []);
  useEffect(() => {
    if (location && location.address !== value) setValue(location.address);
    if (!location && value !== "") setValue("");
  }, [location]);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (timeoutID.current) clearTimeout(timeoutID.current);
    if (!isOpen) setIsOpen(true);
    if (text === "") {
      setPlaces([
        { description: "Anywhere in North America", place_id: "Any" },
      ]);
      setSelected(0);
    } else {
      getPredictions(timeoutID.current, service.current, text, setPlaces);
    }
    setValue(text);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let next = selected;
    if (e.code === "ArrowDown" && next < places.length - 1) next += 1;
    if (e.code === "ArrowUp" && next > 0) next -= 1;
    if (e.code === "Enter" && places.length > 0) {
      handleChange(places[selected].description, places[selected].place_id);
    }
    setSelected(next);
  };
  const handleChange = async (value: string, id: string) => {
    let newParams = new URLSearchParams(params);
    setIsOpen(false);
    if (closeOverlay !== undefined) closeOverlay();
    setPlaces([]);
    inputRef.current?.blur();
    if (id === "Any") {
      setValue("");
      updateLocation(null);
      newParams.delete("location");
      newParams.set("page", "1");
      setParams(newParams);
      return;
    }
    setValue(value);
    const data = await getLocationById(id);
    updateLocation(data);
    newParams.set("location", id);
    newParams.set("page", "1");
    setParams(newParams);
  };
  const handleBlur = () => {
    setIsOpen(false);
    if (location && location.address !== value) setValue(location.address);
  };
  return {
    value,
    places,
    isOpen,
    selected,
    setIsOpen,
    handleInput,
    handleKey,
    handleChange,
    inputRef,
    handleBlur,
  };
};

export default usePlacesInput;
