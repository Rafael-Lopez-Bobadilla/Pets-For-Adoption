import axios from "axios";
import { GeocodingResponseSchema } from "./schemas/geocodingSchema";
import { Loader } from "@googlemaps/js-api-loader";
const key = "AIzaSyBeMIrIdcecTGx6XPecpuBi-2jnNj-86mM";

export const loadAutocompleteService = async () => {
  const loader = new Loader({
    apiKey: `${key}`,
    libraries: ["places"],
    version: "weekly",
  });
  await loader.importLibrary("places");
  return new google.maps.places.AutocompleteService();
};

export const getPredictions = async (
  service: google.maps.places.AutocompleteService,
  text: string
) => {
  const response = await service?.getPlacePredictions({
    input: text,
    componentRestrictions: {
      country: ["us", "mx", "can"],
    },
  });
  const predictions = response?.predictions.map((prediction) => {
    const { description, place_id } = prediction;
    return { description, place_id };
  });
  return predictions;
};

export const getLocationById = async (id: string) => {
  const res = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?place_id=${id}&key=${key}`
  );
  return GeocodingResponseSchema.parse(res.data);
};
