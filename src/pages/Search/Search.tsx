import SearchBar from "./components/SearchBar/SearchBar"
import s from './Search.module.css'
import Filters from "./components/Filters/Filters"
import SearchBody from "./components/SearchBody/SearchBody"
import PetsInfoProvider from "./components/PetsInfoProvider/PetsInfoProvider"
import LocationProvider from "./components/LocationProvider/LocationProvider"
const Search = () => {
  return (
    <div className={s.search}>
      <PetsInfoProvider>
        <LocationProvider>
          <SearchBar />
          <div className={s.wrapper}>
            <div className={s.filters}>
              <Filters />
            </div>
            <div className={s.body}>
              <SearchBody />
            </div>
          </div>
        </LocationProvider>
      </PetsInfoProvider>
    </div>
  )
}

export default Search