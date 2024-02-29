import SearchBar from "./components/SearchBar/SearchBar"
import { useEffect, useState, useContext, createContext } from "react"
import s from './Search.module.css'
import { PetType } from "./utils/IPetType"
import { TokenContext } from "../../App"
import { getPetTypes } from "./utils/getPetTypes"
import Filters from "./components/Filters/Filters"
import PetList from "./components/PetList/PetList"
import { Location } from "./utils/ILocation"
export const LocationContext = createContext<
  { location: Location | null, setLocation: React.Dispatch<React.SetStateAction<Location | null>> }
  | null>(null)
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
      </LocationContext.Provider>
      <div className={s.content}>
        <div className={s.filters}>
          {types && <Filters types={types} />}
        </div>
        <div className={s.list}>
          <LocationContext.Provider value={{ location, setLocation }}>
            <PetList />
          </LocationContext.Provider>
        </div>
      </div>
    </div>
  )
}

export default Search