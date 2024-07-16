import s from "./Favorites.module.css";
import PetCard from "../Search/components/SearchBody/components/PetList/components/PetCard/PetCard";
import { CircularProgress } from "@mui/material";
import LoadError from "../../components/LoadError/LoadError";
import { useFavorites } from "./useFavorites";
const Favorites = () => {
  const { favorites, error, retry, loading, user } = useFavorites();
  return (
    <div className={s.wrapper}>
      {user && <h1>My Favorites {favorites && `(${favorites.length})`}</h1>}
      {error && (
        <LoadError message="Unable to get favorites info" retry={retry} />
      )}
      {loading && (
        <div className={s.loading}>
          <CircularProgress size={30} />
        </div>
      )}
      {favorites && (
        <div className={s.list}>
          {favorites.map((pet) => {
            return (
              <div className={s.card} key={pet.id}>
                <PetCard pet={pet} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Favorites;
