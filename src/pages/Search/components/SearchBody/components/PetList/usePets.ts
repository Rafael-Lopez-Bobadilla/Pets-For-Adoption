import { usePetfinderToken } from "../../../../../../context/TokenContext/context";
import { useLocation } from "../../../../context/LocationContext/context";
import { useValidParams } from "../../../../context/ValidParamsContext/context";
import { getCompleteParams } from "./utils/getCompleteParams";
import { getAnimals } from "../../../../../../services/petfinderService/petfinderService";
import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { TPet } from "../../../../../../services/petfinderService/schemas/PetsSchema";
export const usePets = () => {
  const { params, setDefaultParams } = useValidParams();
  const { token } = usePetfinderToken();
  const {
    location,
    loading: locationLoading,
    error: locationError,
  } = useLocation();
  const getData = async () => {
    if (!token) throw new Error("Token not ready");
    if (!params) throw new Error("Invalid params");
    if (locationError || locationLoading) throw new Error("Location error");
    const completeParams = getCompleteParams(location, params);
    try {
      const data = await getAnimals(token, completeParams);
      data.animals.sort((a: TPet, b: TPet) => {
        const photoA = a.primary_photo_cropped;
        const photoB = b.primary_photo_cropped;
        if (photoA && !photoB) return -1;
        if (!photoA && photoB) return 1;
        return 0;
      });
      return data;
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 400) {
        setDefaultParams();
        throw new Error("Bad request, invalid params");
      } else {
        throw new Error("Something went wrong");
      }
    }
  };
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["pets", params],
    queryFn: () => getData(),
  });
  return { data, isPending, error, refetch, params, setDefaultParams };
};
