import SearchBar from "./components/SearchBar/SearchBar";
import s from "./Search.module.css";
import Filters from "./components/Filters/Filters";
import SearchBody from "./components/SearchBody/SearchBody";
import PetsInfoProvider from "./components/PetsInfoProvider/PetsInfoProvider";
import LocationProvider from "./components/LocationProvider/LocationProvider";
import { createContext, useEffect, useRef } from "react";
import { loadLibrary } from "./utils/loadLibrary";
type service = google.maps.places.AutocompleteService;
export const AutocompleteContext = createContext<service | null>(null);
const Search = () => {
  const service = useRef<service>(null);
  useEffect(() => {
    loadLibrary(service);
  });
  return (
    <AutocompleteContext.Provider value={service.current}>
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
    </AutocompleteContext.Provider>
  );
};

export default Search;
