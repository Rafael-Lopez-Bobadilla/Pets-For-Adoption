import SearchBar from "./components/SearchBar/SearchBar"
import { useEffect, useState, useContext, createContext } from "react"
import s from './Search.module.css'
import { PetType } from "./utils/IPetType"
import { TokenContext } from "../../App"
import { getPetTypes } from "./utils/getPetTypes"
import Filters from "./components/Filters/Filters"
import SearchBody from "./components/SearchBody/SearchBody"
import { Location, ILocationContext } from "./utils/ILocation"
export const LocationContext = createContext<ILocationContext | null>(null)
const Search = () => {
  const token = useContext(TokenContext) as string //routes are not rendered if token is null
  const [types, setTypes] = useState<PetType[] | null>(null)
  const [location, setLocation] = useState<Location | null>(null)
  useEffect(() => {
    getPetTypes(token, setTypes)
  }, [])
  return (
    <div className={s.search}>
      <LocationContext.Provider value={{ location, setLocation }}>
        <SearchBar types={types} />
        <div className={s.wrapper}>
          <div className={s.filters}>
            {types && <Filters types={types} />}
          </div>
          <div className={s.body}>
            <SearchBody types={types} />
          </div>
        </div>
      </LocationContext.Provider>
    </div>
  )
}

export default Search