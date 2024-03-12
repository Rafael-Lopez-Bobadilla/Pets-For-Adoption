import { Pets, Pet, PetsData } from "./IPets"
import { Location } from "../../../../utils/ILocation"
import { SetURLSearchParams } from "react-router-dom"
import { manageLocation } from "./manageLocation"
export const getPets = async (params: URLSearchParams,
  token: string,
  setSearchParams: SetURLSearchParams,
  setPets: React.Dispatch<React.SetStateAction<Pets>>,
  location: Location | null,
  setLocation: React.Dispatch<React.SetStateAction<Location | null>>) => {
  const requestParams = await manageLocation(location, params, setSearchParams, setLocation)
  if (!requestParams) return
  setPets(pets => { return { ...pets, loading: true } })
  if (requestParams.has('color')) {
    const color = requestParams.get('color') as string
    requestParams.delete('color')
    requestParams.set('color[]', color)
  }
  const res = await fetch(`https://api.petfinder.com/v2/animals?${requestParams}&limit=12`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  if (res.status === 400) {
    setSearchParams(new URLSearchParams({ type: 'Dog' }))
    return
  }
  const data: PetsData = await res.json()
  const compareByImg = (a: Pet, b: Pet) => {
    const aImg = a.primary_photo_cropped
    const bImg = b.primary_photo_cropped
    if (aImg && !bImg) return -1
    if (bImg && !aImg) return 1
    return 0
  }
  data.animals.sort(compareByImg)
  setPets({ data: data, loading: false })
}