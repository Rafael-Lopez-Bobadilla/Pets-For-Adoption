import { LocationContext } from "./context";
import { useFetch } from "../../../../useFetch";
import { getLocationById } from "../../../../services/placesService/placesService";
import { useSearchParams } from "react-router-dom";
import { TGeocodingResponse } from "./context";
import { extractLocation } from "./extractLocation";
import { useEffect } from "react";
const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  const [params, setParams] = useSearchParams();
  const id = params.get("location");
  const getLocationInfo = () => {
    if (!id) return null;
    return getLocationById(id);
  };
  const updateLocation = (data: TGeocodingResponse | null) => {
    setData(data);
  };
  const changeLocation = async (id: string) => {
    try {
      const data = await getLocationById(id);
      updateLocation(data);
    } catch (err) {
      params.delete("location");
      setParams(new URLSearchParams(params));
    }
  };
  const { data, loading, error, setData } =
    useFetch<TGeocodingResponse>(getLocationInfo);
  useEffect(() => {
    if (id && (!location || id !== location.id)) {
      changeLocation(id);
    }
    if (id && location) updateLocation(null);
  }, [params]);
  const location = extractLocation(data);
  return (
    <LocationContext.Provider
      value={{ location, loading, error, updateLocation }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
