import { usePetfinderToken } from "../../../../../../context/TokenContext/context";
import { CircularProgress } from "@mui/material";
import s from "./PetList.module.css";
import { useLocation } from "../../../../context/LocationContext/context";
import PetCard from "./components/PetCard/PetCard";
import NoResults from "./components/NoResults/NoResults";
import { useQuery } from "@tanstack/react-query";
import { getCompleteParams } from "./utils/getCompleteParams";
import { getAnimals } from "../../../../../../services/petfinderService/petfinderService";
import { AxiosError } from "axios";
import { useValidParams } from "../../../../context/ValidParamsContext/context";
const PetList = ({
  updatePageCount,
}: {
  updatePageCount: (count: number) => void;
}) => {
  const { params, clearFilters } = useValidParams();
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
      updatePageCount(data.pagination.total_pages);
      return data;
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 400) {
        clearFilters();
      } else {
        throw new Error("Server error not 400");
      }
    }
  };
  const { data, isPending } = useQuery({
    queryKey: ["pets", params],
    queryFn: () => getData(),
  });
  return (
    <>
      <div className={s.list}>
        {data &&
          !isPending &&
          data.animals.map((pet) => (
            <div key={pet.id} className={s.card}>
              <PetCard pet={pet} />
            </div>
          ))}
      </div>
      {isPending && (
        <div className={s.loading}>
          <CircularProgress size={30} />
        </div>
      )}
      {data?.animals?.length === 0 && !isPending && <NoResults />}
    </>
  );
};

export default PetList;
