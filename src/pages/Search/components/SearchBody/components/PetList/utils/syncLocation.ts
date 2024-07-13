import { TLocation } from "../../../../../context/LocationContext/context";

export const isLocationSync = (
  params: URLSearchParams,
  location: TLocation | null
) => {
  if (
    params.has("location") &&
    (!location || params.get("location") !== location.id)
  )
    return false;
  if (!params.has("location") && location) return false;
  return true;
};
