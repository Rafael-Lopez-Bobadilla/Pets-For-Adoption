export type BreedType = {
  name: string,
  _links: {
    type: {
      href: string
    }
  }
}
export const getBreeds = async (token: string, link: string,
  setBreeds: React.Dispatch<React.SetStateAction<string[] | null>>) => {
  const res = await fetch(`https://api.petfinder.com${link}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  const data = await res.json()
  const breeds = data.breeds.map((breed: BreedType) => breed.name)
  setBreeds(breeds)
}