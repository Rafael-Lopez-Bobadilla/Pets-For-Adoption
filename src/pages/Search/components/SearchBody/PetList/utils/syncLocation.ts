import { SetURLSearchParams } from "react-router-dom"
import { getLocation } from "../../../../utils/getLocation"
import { Location } from "../../../../utils/ILocation"
export const syncLocation = async (
  params: URLSearchParams,
  setSearchParams: SetURLSearchParams,
  location: Location | null,
  setLocation: React.Dispatch<React.SetStateAction<Location | null>>
) => {
  if (params.has('location') && (!location || params.get('location') !== location.id)) {
    const id = params.get('location') as string
    const location = await getLocation(id)
    if (!location) {
      params.delete('location')
      setSearchParams(params)
      return false
    }
    const { lat, lng } = location.results[0].geometry.location
    const coords = `${lat},${lng}`
    const address = location.results[0].formatted_address
    setLocation({ id, coords, address })
  }
  if (!params.has('location') && location) setLocation(null)
}

export const isLocationSync = (params: URLSearchParams,
  location: Location | null,) => {
  if (params.has('location') && (!location || params.get('location') !== location.id)) return false
  if (!params.has('location') && location) return false
  return true
}