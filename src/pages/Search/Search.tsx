import SearchBar from "./components/SearchBar/SearchBar";
import s from "./Search.module.css";
import Filters from "./components/Filters/Filters";
import SearchBody from "./components/SearchBody/SearchBody";
import LocationProvider from "./context/LocationContext/LocationProvider";
const Search = () => {
  return (
    <LocationProvider>
      <div className={s.search}>
        <SearchBar />
        <div className={s.wrapper}>
          <div className={s.filters}>
            <Filters />
          </div>
          <main>
            <SearchBody />
          </main>
        </div>
      </div>
    </LocationProvider>
  );
};

export default Search;
