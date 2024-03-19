import { Pet } from "../Search/components/SearchBody/PetList/utils/IPets"
export const getPet = async (id: string, token: string,
  setFavorites: React.Dispatch<React.SetStateAction<Pet[]>>) => {
  const res = await fetch(`https://api.petfinder.com/v2/animals/${id}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  const data = await res.json()
  setFavorites(prevFavs => {
    const newFavs = [...prevFavs, data.animal]
    return newFavs
  })
}