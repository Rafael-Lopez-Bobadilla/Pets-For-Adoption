import { CircularProgress } from "@mui/material";
import s from "./PetList.module.css";
import PetCard from "./components/PetCard/PetCard";
import NoResults from "./components/NoResults/NoResults";
import { usePets } from "./usePets";
import LoadError from "../../../../../../components/LoadError/LoadError";
const PetList = ({
  updatePageCount,
}: {
  updatePageCount: (count: number) => void;
}) => {
  const { data, isPending, error, refetch } = usePets(updatePageCount);
  if (isPending)
    return (
      <div className={s.loading}>
        <CircularProgress size={30} />
      </div>
    );
  if (error)
    return <LoadError message="Unable to get pets info" retry={refetch} />;
  if (data)
    return data.animals.length > 0 ? (
      <div className={s.list}>
        {data.animals.map((pet) => (
          <div key={pet.id} className={s.card}>
            <PetCard pet={pet} />
          </div>
        ))}
      </div>
    ) : (
      <NoResults />
    );
};

export default PetList;
