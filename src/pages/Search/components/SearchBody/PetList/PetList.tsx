import { Pets } from "./utils/IPets"
import { useState, useContext, useEffect } from "react"
import { TokenContext } from "../../../../../App"
import { useSearchParams } from "react-router-dom"
import { getPets } from "./utils/getPets"
import { CircularProgress } from "@mui/material"
import s from './PetList.module.css'
import { LocationContext } from "../../../Search"
import { validateParams } from "./utils/validateParams"
import PetCard from "./PetCard/PetCard"
import { clearFilters, clearLocation } from "./utils/clearingEvents"
import { ILocationContext } from "../../../utils/ILocation"
const PetList = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const token = useContext(TokenContext) as string
  const [pets, setPets] = useState<Pets>({ data: null, loading: false })
  const { location, setLocation } = useContext(LocationContext) as ILocationContext
  useEffect(() => {
    const validParams = validateParams(setSearchParams, searchParams)
    if (!validParams) return
    getPets(validParams, token, setSearchParams, setPets, location, setLocation)
  }, [searchParams])
  const filtersExists = () => {
    if (searchParams.size > 2 || (searchParams.size > 1 && !searchParams.has('location'))) {
      return true
    } else { return false }
  }
  console.log('render list')
  return (
    <>
      <div className={s.list}>
        {(pets.data && !pets.loading) && pets.data.animals.map(pet =>
          <div key={pet.id} className={s.card}>
            <PetCard pet={pet} />
          </div>
        )}
        {pets.loading && <div className={s.loading}><CircularProgress size={30} /></div>}
      </div>
      {(pets.data?.animals.length === 0 && !pets.loading) &&
        <h2 className={s.alert}>No results matching your criteria. Consider {location && <>
          <span> looking for pets <a onClick={() => clearLocation(setLocation, setSearchParams)}>
            Anywhere in North America</a></span>
          {filtersExists() && ' or '}
        </>
        }
          {filtersExists() &&
            <a onClick={() => clearFilters(searchParams, setSearchParams)}>Clearing the filters</a>}
        </h2>
      }
    </>
  )
}

export default PetList