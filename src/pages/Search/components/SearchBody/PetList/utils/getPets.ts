import { Pet, PetsData } from "./IPets"
import { Location } from "../../../../utils/ILocation"
import { SetURLSearchParams } from "react-router-dom"
import { manageLocation } from "./manageLocation"
import { validateParams } from "./validateParams"
export const getPets = async (token: string | null,
  setSearchParams: SetURLSearchParams,
  searchParams: URLSearchParams,
  location: Location | null,
  setLocation: React.Dispatch<React.SetStateAction<Location | null>>,
  setPageCount: React.Dispatch<React.SetStateAction<number>>) => {
  console.log('fetching')
  if (!token) throw new Error('wait')
  const validParams = validateParams(setSearchParams, searchParams)
  if (!validParams) throw new Error('wait')
  const requestParams = await manageLocation(location, validParams, setSearchParams, setLocation)
  if (!requestParams) throw new Error('wait')
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
    setSearchParams(new URLSearchParams({ type: 'Dog', page: '1' }))
    throw new Error('reset')
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
  setPageCount(data.pagination.total_pages)
  return data.animals
}