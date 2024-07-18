import { LocationContext } from "./context";
import { getLocationById } from "../../../../services/placesService/placesService";
import { extractLocation } from "./extractLocation";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useValidParams } from "../ValidParamsContext/context";
import { AxiosError } from "axios";
const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  const { params, removeParam } = useValidParams();
  const idParam = params?.location;
  const getLocationInfo = async () => {
    if (!idParam) return null;
    try {
      return await getLocationById(idParam);
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 400) {
        removeParam("location");
        throw new Error("Invalid location");
      } else {
        throw new Error("Somethinig went wrong");
      }
    }
  };
  const { data, isPending, error } = useQuery({
    queryKey: ["location", idParam],
    queryFn: () => getLocationInfo(),
  });
  useEffect(() => {
    if (error) removeParam("location");
  }, [error]);
  const location = extractLocation(data);
  return (
    <LocationContext.Provider value={{ location, loading: isPending, error }}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
