import { usePetfinderToken } from "../../../../../context/TokenContext/context";
import { useSearchParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import s from "./PetList.module.css";
import { useLocation } from "../../../context/LocationContext/context";
import PetCard from "./components/PetCard/PetCard";
import { memo } from "react";
import NoResults from "./components/NoResults/NoResults";
import { useQuery } from "@tanstack/react-query";
import { isLocationSync } from "./utils/syncLocation";
import { validateParams } from "./utils/validateParams";
import { manageLocation } from "./utils/manageLocation";
import { handleColorParam } from "./handleColorParam";
import { getAnimals } from "../../../../../services/petfinderService/petfinderService";
import { ZodError } from "zod";
const PetList = memo(
  ({
    setPageCount,
  }: {
    setPageCount: React.Dispatch<React.SetStateAction<number>>;
  }) => {
    const [params, setParams] = useSearchParams();
    const { token } = usePetfinderToken();
    const { location } = useLocation();
    const validParams = validateParams(setParams, params);
    const getData = async (token: string, validParams: URLSearchParams) => {
      const readyParams = handleColorParam(validParams);
      const requestParams = manageLocation(location, readyParams);
      try {
        const data = await getAnimals(token, requestParams);
        setPageCount(data.pagination.total_pages);
        return data;
      } catch (err) {
        if (err instanceof ZodError) console.log(err.issues);
      }
    };
    const isRequestReady = () => {
      if (!token) return false;
      if (!validParams) return false;
      if (!isLocationSync(params, location)) return false;
    };
    const { data, isPending } = useQuery({
      queryKey: [`${params.toString()}`],
      queryFn: () => getData(token!, validParams as URLSearchParams),
      enabled: isRequestReady(),
    });
    //if error, reset params
    /**
       if (res.status === 400) {
    setSearchParams(new URLSearchParams({ type: "Dog", page: "1" }));
    throw new Error("reset");
  }
  const data: PetsData = await res.json();
  const compareByImg = (a: Pet, b: Pet) => {
    const aImg = a.primary_photo_cropped;
    const bImg = b.primary_photo_cropped;
    if (aImg && !bImg) return -1;
    if (bImg && !aImg) return 1;
    return 0;
  };
  data.animals.sort(compareByImg);
     */
    //order pets by images
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
