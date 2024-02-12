import s from './Search.module.css'
import SearchBar from "../../components/SearchBar/SearchBar"
import Filters from '../../components/Filters/Filters'
import PetList from '../../components/PetList/PetList'
import usePetTypes from "./usePetTypes"
const Search = () => {
  const { names, types } = usePetTypes()
  return (
    <>
      <SearchBar names={names} />
      <div className={s.content}>
        <div className={s.filters}>
          {types && <Filters types={types} />}
        </div>
        <PetList />
      </div>
    </>
  )
}

export default Search