import { Pets } from "./IPets"
import { Location } from "../../../utils/ILocation"
import { getLocation } from "../../../utils/getLocation"
export const getPets = async (params: URLSearchParams,
  token: string,
  setSearchParams: any,
  setPets: React.Dispatch<React.SetStateAction<Pets>>,
  location: Location | null,
  setLocation: React.Dispatch<React.SetStateAction<Location | null>>) => {
  let coords = location ? location.coords : ''
  if (params.has('location') && (!location || params.get('location') !== location.id)) {
    const id = params.get('location') as string
    const location = await getLocation(id)
    if (!location) {
      params.delete('location')
      setSearchParams(params)
      return
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
  setPets(pets => { return { ...pets, loading: true } })
  console.log(params.toString())
  const res = await fetch(`https://api.petfinder.com/v2/animals?${params}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  if (res.status === 400) {
    setSearchParams(new URLSearchParams({ type: 'Dog' }))
    return
  }
  const data = await res.json()
  setPets({ data: data, loading: false })
}