import { Location } from "../../../../utils/ILocation";

export const isLocationSync = (
  params: URLSearchParams,
  location: Location | null
) => {
  if (
    params.has("location") &&
    (!location || params.get("location") !== location.id)
  )
    return false;
  if (!params.has("location") && location) return false;
  return true;
};
