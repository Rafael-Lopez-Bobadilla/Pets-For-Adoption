import { TPet } from "../../services/petfinderService/schemas/PetsSchema";
export const getPet = async (
  id: string,
  token: string,
  setFavorites: React.Dispatch<React.SetStateAction<TPet[]>>
) => {
  const res = await fetch(`https://api.petfinder.com/v2/animals/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  setFavorites((prevFavs) => {
    const newFavs = [...prevFavs, data.animal];
    return newFavs;
  });
};
