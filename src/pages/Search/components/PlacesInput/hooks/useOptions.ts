import { useRef, useState } from "react";
import { useFetch } from "../../../../../hooks/useFetch";
import { loadAutocompleteService } from "../../../../../services/placesService/placesService";
import { getPredictions } from "../../../../../services/placesService/placesService";
type service = google.maps.places.AutocompleteService;
type Place = {
  description: string;
  place_id: string;
};
export const useOptions = (ANY_ID: string) => {
  const [options, setOptions] = useState<Place[]>([]);
  const timeoutID = useRef<NodeJS.Timeout | null>(null);
  const { data: service, error: loadError } = useFetch<service>(
    loadAutocompleteService
  );
  const setDefaultOption = () => {
    const defaultOption = {
      description: "Anywhere in North America",
      place_id: ANY_ID,
    };
    setOptions([defaultOption]);
  };
  const setPredictions = async (text: string) => {
    if (timeoutID.current) clearTimeout(timeoutID.current);
    if (service && text !== "") {
      timeoutID.current = setTimeout(async () => {
        timeoutID.current = null;
        const options = await getPredictions(service, text);
        setOptions(options);
      }, 250);
    }
  };
  const clearOptions = () => setOptions([]);
  return {
    loadError,
    options,
    setDefaultOption,
    setPredictions,
    clearOptions,
  };
};
