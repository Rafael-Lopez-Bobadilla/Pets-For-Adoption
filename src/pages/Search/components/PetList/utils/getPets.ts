import { Pets } from "./IPets"
import { Location } from "../../../utils/ILocation"
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
  const res = await fetch(`https://api.petfinder.com/v2/animals?${requestParams}`, {
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