import { LocationContext } from "./context";
import { getLocationById } from "../../../../services/placesService/placesService";
import { extractLocation } from "./extractLocation";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useValidParams } from "../ValidParamsContext/context";
const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  const { params, removeParam } = useValidParams();
  const idParam = params?.location;
  const getLocationInfo = () => {
    if (!idParam) return null;
    try {
      return getLocationById(idParam);
    } catch (err) {
      throw new Error("Invalid Location");
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
