import { useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useUser } from "../../context/UserContext/context";
import { usePetfinderToken } from "../../context/TokenContext/context";
import { useNavigate } from "react-router-dom";
import { getPet } from "../../services/petfinderService/petfinderService";
export const useFavorites = () => {
  const { user, loading: loadingUser } = useUser();
  const { token } = usePetfinderToken();
  const navigate = useNavigate();
  const getData = async () => {
    if (!user || !token) return null;
    const favs = user.favorites.map(async (id) => {
      return (await getPet(token, id)).animal;
    });
    return await Promise.all(favs);
  };
  let enable = user && token ? true : false;
  const { data: favorites, loading, retry, error } = useFetch(getData, enable);
  useEffect(() => {
    if ((!loadingUser && !user) || user?.favorites.length === 0) navigate("/");
  }, [user, loadingUser]);
  return { favorites, loading, retry, error, user };
};
