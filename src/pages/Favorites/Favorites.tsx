import s from "./Favorites.module.css";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext/context";
import { usePetfinderToken } from "../../context/TokenContext/context";
import { getPet } from "./getPet";
import PetCard from "../Search/components/SearchBody/components/PetList/components/PetCard/PetCard";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TPet } from "../../services/petfinderService/schemas/PetsSchema";
const Favorites = () => {
  const { user, loading } = useUser();
  const { token } = usePetfinderToken();
  const [favorites, setFavorites] = useState<TPet[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    if ((!loading && !user) || user?.favorites.length === 0) navigate("/");
    if (token && user && favorites.length === 0) {
      user.favorites.forEach((id) => {
        getPet(id, token, setFavorites);
      });
    }
  }, [token, user, loading]);
  return (
    <div className={s.wrapper}>
      {user && <h1>{`My Favorites (${user?.favorites.length})`}</h1>}
      {favorites.length === 0 && (
        <div className={s.loading}>
          <CircularProgress size={30} />
        </div>
      )}
      <div className={s.list}>
        {favorites.map((pet) => {
          return (
            <div className={s.card} key={pet.id}>
              <PetCard pet={pet} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Favorites;
