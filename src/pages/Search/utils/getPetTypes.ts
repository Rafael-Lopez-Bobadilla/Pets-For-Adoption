import { PetType } from "./IPetType"
export const getPetTypes = async (token: string, setTypes: React.Dispatch<React.SetStateAction<PetType[] | null>>) => {
  const res = await fetch('https://api.petfinder.com/v2/types', {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  const data = await res.json()
  setTypes(data.types)
  return data.types
}