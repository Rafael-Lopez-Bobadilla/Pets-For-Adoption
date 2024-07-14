import { TLocation } from "../../../../../context/LocationContext/context";
import { TValidParams } from "../../../../../utils/paramsSchema";
export const getCompleteParams = (
  location: TLocation | null,
  params: TValidParams
) => {
  const searchParams = new URLSearchParams(params);
  if (params.location && location)
    searchParams.set("location", location.coords);
  if (!params.location) searchParams.set("location", "34.0736204,-118.4003563"); //coords that provide pets with images
  searchParams.set("distance", "500");
  searchParams.set("sort", "distance");
  searchParams.set("limit", "12");
  const color = params.color;
  if (color) {
    searchParams.set("color[]", color);
    searchParams.delete("color");
  }
  return searchParams;
};
