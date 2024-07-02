import { SetURLSearchParams } from "react-router-dom";
export const clearFilters = (
  searchParams: URLSearchParams,
  setSearchParams: SetURLSearchParams
) => {
  const newParams = new URLSearchParams();
  newParams.set("page", "1");
  newParams.set("type", searchParams.get("type") as string);
  searchParams.has("location") &&
    newParams.set("location", searchParams.get("location") as string);
  setSearchParams(newParams);
};

export const clearLocation = (
  updateLocation: (data: any) => void,
  setSearchParams: SetURLSearchParams
) => {
  updateLocation(null);
  setSearchParams((prevParams) => {
    prevParams.delete("location");
    prevParams.set("page", "1");
    return prevParams;
  });
};
