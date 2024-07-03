import SearchBar from "./components/SearchBar/SearchBar";
import s from "./Search.module.css";
import Filters from "./components/Filters/Filters";
import SearchBody from "./components/SearchBody/SearchBody";
import LocationProvider from "./context/LocationContext/LocationProvider";
import PetTypesProvider from "./context/PetTypesContext/PetTypesProvider";
const Search = () => {
  return (
    <PetTypesProvider>
      <div className={s.search}>
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
      </div>
    </PetTypesProvider>
  );
};

export default Search;
