import SearchBar from "./components/SearchBar/SearchBar"
import usePetsData from "./utils/usePetsData"
import s from './Search.module.css'
import Filters from "./components/Filters/Filters"
import PetList from "./components/PetList/PetList"
const Search = () => {
  const { types, breeds, pets } = usePetsData()
  return (
    <>
      <SearchBar types={types} />
      <div className={s.content}>
        <div className={s.filters}>
          {types && <Filters types={types} breeds={breeds} />}
        </div>
        <PetList pets={pets} />
      </div>
    </>
  )
}

export default Search