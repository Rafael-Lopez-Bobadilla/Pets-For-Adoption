import { createContext, useContext } from "react";
import { z } from "zod";
import { GeocodingResponseSchema } from "../../../../services/placesService/geocodingSchema";
export type TGeocodingResponse = z.infer<typeof GeocodingResponseSchema>;
type TLocationContext = {
  location: {
    address: string;
    coords: string;
    id: string;
  } | null;
  loading: boolean;
  error: boolean;
  updateLocation: (data: TGeocodingResponse | null) => void;
};
export const LocationContext = createContext<TLocationContext | null>(null);

export const useLocation = () => {
  const value = useContext(LocationContext);
  if (!value)
    throw new Error("Location context can only be used within its provider");
  return value;
};
