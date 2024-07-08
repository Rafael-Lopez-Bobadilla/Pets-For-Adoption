import s from "./SearchBar.module.css";
import TypesSelect from "./components/TypesSelect/TypesSelect";
import PlacesInput from "../PlacesInput/PlacesInput";
import MobileBar from "./components/MobileBar/MobileBar";

const SearchBar = () => {
  return (
    <div className={s.bar}>
      <div className={s.wrapper}>
        <MobileBar />
        <div className={s.select}>
          <TypesSelect />
        </div>
        <div className={s.input}>
          <PlacesInput />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
