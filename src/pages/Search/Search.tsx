import SearchBar from "./components/SearchBar/SearchBar";
import s from "./Search.module.css";
import Filters from "./components/Filters/Filters";
import SearchBody from "./components/SearchBody/SearchBody";
import LocationProvider from "./context/LocationContext/LocationProvider";
import ValidParamsProvider from "./context/ValidParamsContext/ValidParamsProvider";
const Search = () => {
  return (
    <ValidParamsProvider>
      <LocationProvider>
        <div className={s.search}>
          <SearchBar />
          <div className={s.wrapper}>
            <aside className={s.filters}>
              <Filters />
            </aside>
            <main>
              <SearchBody />
            </main>
          </div>
        </div>
      </LocationProvider>
    </ValidParamsProvider>
  );
};

export default Search;
