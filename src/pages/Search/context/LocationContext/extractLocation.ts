import { TGeocodingResponse } from "./context";
export const extractLocation = (data: TGeocodingResponse | null) => {
  if (!data) return null;
  const { lat, lng } = data.results[0].geometry.location;
  const coords = `${lat},${lng}`;
  const address = data.results[0].formatted_address;
  const id = data.results[0].place_id;
  return { coords, address, id };
};
