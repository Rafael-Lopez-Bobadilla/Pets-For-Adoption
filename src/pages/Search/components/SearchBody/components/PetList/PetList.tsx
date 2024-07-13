import { usePetfinderToken } from "../../../../../../context/TokenContext/context";
import { useSearchParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import s from "./PetList.module.css";
import { useLocation } from "../../../../context/LocationContext/context";
import PetCard from "./components/PetCard/PetCard";
import { memo } from "react";
import NoResults from "./components/NoResults/NoResults";
import { useQuery } from "@tanstack/react-query";
import { isLocationSync } from "./utils/syncLocation";
import { validateParams } from "./utils/validateParams";
import { manageLocation } from "./utils/manageLocation";
import { handleColorParam } from "./handleColorParam";
import { getAnimals } from "../../../../../../services/petfinderService/petfinderService";
import { AxiosError } from "axios";
const PetList = memo(
  ({
    setPageCount,
  }: {
    setPageCount: React.Dispatch<React.SetStateAction<number>>;
  }) => {
    const [params, setParams] = useSearchParams();
    const { token } = usePetfinderToken();
    const { location } = useLocation();
    const getData = async () => {
      if (!token) throw new Error("Token not ready");
      const validParams = validateParams(setParams, params);
      if (!validParams) throw new Error("Invalid params");
      if (!isLocationSync(params, location))
        throw new Error("Invalid Location");
      const readyParams = handleColorParam(validParams);
      const requestParams = manageLocation(location, readyParams);
      try {
        const data = await getAnimals(token, requestParams);
        setPageCount(data.pagination.total_pages);
        return data;
      } catch (err) {
        if (err instanceof AxiosError && err.response?.status === 400) {
          setParams(new URLSearchParams({ type: "Dog", page: "1" }));
        } else {
          throw new Error("Server error not 400");
        }
      }
    };
    const { data, isPending } = useQuery({
      queryKey: ["pets", Object.fromEntries(params)],
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
  }
);

export default PetList;
