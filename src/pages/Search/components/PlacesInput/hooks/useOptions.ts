import { useState } from "react";
import { useFetch } from "../../../../../useFetch";
import { loadAutocompleteService } from "../../../../../services/placesService/placesService";
import { getPredictions } from "../../../../../services/placesService/placesService";
type service = google.maps.places.AutocompleteService;
type Place = {
  description: string;
  place_id: string;
};
export const useOptions = (ANY_ID: string) => {
  const [options, setOptions] = useState<Place[]>([]);
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
    if (service) {
      const options = await getPredictions(service, text);
      setOptions(options);
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
