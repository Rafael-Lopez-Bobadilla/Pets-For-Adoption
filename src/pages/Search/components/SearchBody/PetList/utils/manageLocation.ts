import { TLocation } from "../../../../context/LocationContext/context";
export const manageLocation = (
  location: TLocation | null,
  params: URLSearchParams
) => {
  if (location) {
    if (params.has("location")) params.set("location", location.coords);
  }
  if (!params.has("location")) {
    params.set("location", "34.0736204,-118.4003563"); //coords that provide pets with images
  }
  params.set("distance", "500");
  params.set("sort", "distance");
  params.set("limit", "12");
  return params;
};
