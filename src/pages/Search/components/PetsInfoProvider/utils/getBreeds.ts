import { Breeds } from "./IBreeds"
type breedType = {
  name: string,
  _links: {
    type: {
      href: string
    }
  }
}

export const getBreeds = async (token: string, link: string,
  setBreeds: React.Dispatch<React.SetStateAction<Breeds>>) => {
  setBreeds(breeds => { return { ...breeds, loading: true } })
  if (!token) return
  const res = await fetch(`https://api.petfinder.com${link}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  const data = await res.json()
  const breeds = data.breeds.map((breed: breedType) => breed.name)
  setBreeds({ data: breeds, loading: false })
}