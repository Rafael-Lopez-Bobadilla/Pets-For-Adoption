import { SetURLSearchParams } from "react-router-dom"
import { Location } from "../../../../utils/ILocation"
export const clearFilters = (
  searchParams: URLSearchParams,
  setSearchParams: SetURLSearchParams
) => {
  const newParams = new URLSearchParams()
  newParams.set('page', '1')
  newParams.set('type', searchParams.get('type') as string)
  searchParams.has('location') && newParams.set('location', searchParams.get('location') as string)
  setSearchParams(newParams)
}

export const clearLocation = (
  setLocation: React.Dispatch<React.SetStateAction<Location | null>>,
  setSearchParams: SetURLSearchParams
) => {
  setLocation(null)
  setSearchParams(prevParams => {
    prevParams.delete('location')
    prevParams.set('page', '1')
    return prevParams
  })
}