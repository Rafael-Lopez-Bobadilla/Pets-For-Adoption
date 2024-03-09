import { Breeds } from "./filtersTypes"
import { BreedType } from "./filtersTypes"

export const getBreeds = async (token: string, link: string,
  setBreeds: React.Dispatch<React.SetStateAction<Breeds>>) => {
  setBreeds(breeds => { return { ...breeds, loading: true } })
  const res = await fetch(`https://api.petfinder.com${link}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  const data = await res.json()
  const breeds = data.breeds.map((breed: BreedType) => breed.name)
  setBreeds({ data: breeds, loading: false })
}