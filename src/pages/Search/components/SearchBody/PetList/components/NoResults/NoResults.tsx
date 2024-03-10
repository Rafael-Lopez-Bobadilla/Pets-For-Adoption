import s from './NoResults.module.css'
import { useSearchParams } from 'react-router-dom'
import { clearFilters, clearLocation } from '../../utils/clearingEvents'
import { LocationContext } from '../../../../LocationProvider/LocationProvider'
import { useContext } from 'react'
const NoResults = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { location, setLocation } = useContext(LocationContext)
  const filtersExists = () => {
    if (searchParams.size > 2 || (searchParams.size > 1 && !searchParams.has('location'))) {
      return true
    } else { return false }
  }
  return (
    <h2 className={s.alert}>No results matching your criteria. Consider {location && <>
      <span> looking for pets <a onClick={() => clearLocation(setLocation, setSearchParams)}>
        Anywhere in North America</a></span>
      {filtersExists() && ' or '}
    </>
    }
      {filtersExists() &&
        <a onClick={() => clearFilters(searchParams, setSearchParams)}>Clearing the filters</a>}
    </h2>
  )
}

export default NoResults