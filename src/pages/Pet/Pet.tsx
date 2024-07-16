import s from "./Pet.module.css";
import { useParams } from "react-router-dom";
import { usePetfinderToken } from "../../context/TokenContext/context";
import Photos from "./components/Photos/Photos";
import FavButton from "../../components/FavButton/FavButton";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getPet } from "../../services/petfinderService/petfinderService";
import LoadError from "../../components/LoadError/LoadError";
import Info from "./components/Info/Info";
const Pet = () => {
  const { token } = usePetfinderToken();
  const { id } = useParams();
  const getData = async () => {
    if (!id) throw new Error("No id");
    if (!token) throw new Error("No token");
    const data = await getPet(token, id);
    return data.animal;
  };
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["pet", id],
    queryFn: () => getData(),
  });
  if (isPending)
    return (
      <div className={s.loading}>
        <CircularProgress size={30} />
      </div>
    );
  if (error)
    return <LoadError message="Unable to get pet info" retry={refetch} />;
  return (
    <div className={s.wrapper}>
      <Photos pet={data} />
      <div className={s.info}>
        <div className={s.name}>
          <h2>{data.name}</h2>
          <FavButton id={data.id} background="gray" />
        </div>
        <Info data={data} />
      </div>
    </div>
  );
};

export default Pet;
