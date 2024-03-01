import { Location } from "../../../utils/ILocation"
import { getLocation } from "../../../utils/getLocation"
import { SetURLSearchParams } from "react-router-dom"
export const manageLocation = async (location: Location | null,
  params: URLSearchParams,
  setSearchParams: SetURLSearchParams,
  setLocation: React.Dispatch<React.SetStateAction<Location | null>>
) => {
  let coords = location ? location.coords : ''
  if (params.has('location') && (!location || params.get('location') !== location.id)) {
    const id = params.get('location') as string
    const location = await getLocation(id)
    if (!location) {
      params.delete('location')
      setSearchParams(params)
      return false
    }
    const { lat, lng } = location.results[0].geometry.location
    coords = `${lat},${lng}`
    const address = location.results[0].formatted_address
    setLocation({ id, coords, address })
  }
  if (!params.has('location') && location) {
    setLocation(null)
  }
  if (params.has('location')) {
    params.set('location', coords)
    params.set('distance', '500')
    params.set('sort', 'distance')
  }
  return params
}