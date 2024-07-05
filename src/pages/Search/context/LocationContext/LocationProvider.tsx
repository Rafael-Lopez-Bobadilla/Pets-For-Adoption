import { LocationContext } from "./context";
import { getLocationById } from "../../../../services/placesService/placesService";
import { useSearchParams } from "react-router-dom";
import { extractLocation } from "./extractLocation";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  const [params, setParams] = useSearchParams();
  const idParam = params.get("location");
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
    if (error) {
      const newParams = new URLSearchParams(params);
      newParams.delete("location");
      setParams(newParams);
    }
  }, [error]);
  const location = extractLocation(data);
  return (
    <LocationContext.Provider value={{ location, loading: isPending, error }}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
