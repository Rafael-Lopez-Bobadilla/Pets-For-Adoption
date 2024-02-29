import SearchBar from "./components/SearchBar/SearchBar"
import { useEffect, useState, useContext } from "react"
import s from './Search.module.css'
import { PetType } from "./utils/IPetType"
import { TokenContext } from "../../App"
import { getPetTypes } from "./utils/getPetTypes"
import Filters from "./components/Filters/Filters"
import PetList from "./components/PetList/PetList"
const Search = () => {
  const token = useContext(TokenContext) as string //routes are not rendered if token is null
  const [types, setTypes] = useState<PetType[] | null>(null)

  useEffect(() => {
    getPetTypes(token, setTypes)
  }, [])
  return (
    <div className={s.search}>
      <SearchBar types={types} />
      <div className={s.content}>
        <div className={s.filters}>
          {types && <Filters types={types} />}
        </div>
        <div className={s.list}>
          <PetList />
        </div>
      </div>
    </div>
  )
}

export default Search