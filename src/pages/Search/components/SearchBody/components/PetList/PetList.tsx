import { CircularProgress } from "@mui/material";
import s from "./PetList.module.css";
import PetCard from "./components/PetCard/PetCard";
import NoResults from "./components/NoResults/NoResults";
import { usePets } from "./usePets";
import LoadError from "../../../../../../components/LoadError/LoadError";
import Pagination from "./components/Pagination/Pagination";
const PetList = () => {
  const { data, isPending, error, refetch, params, setDefaultParams } =
    usePets();
  if (isPending)
    return (
      <div className={s.loading}>
        <CircularProgress size={30} />
      </div>
    );
  if (error)
    return (
      <LoadError message="Unable to get pets info" retry={refetch}>
        <p className={s.default} onClick={setDefaultParams}>
          Or try setting default params
        </p>
      </LoadError>
    );
  if (data)
    return data.animals.length > 0 ? (
      <>
        <div className={s.list}>
          {data.animals.map((pet) => (
            <div key={pet.id} className={s.card}>
              <PetCard pet={pet}>
                {params?.location && `${Math.round(pet.distance)} miles away`}
              </PetCard>
            </div>
          ))}
        </div>
        <Pagination pageCount={data.pagination.total_pages} />
      </>
    ) : (
      <NoResults />
    );
};

export default PetList;
