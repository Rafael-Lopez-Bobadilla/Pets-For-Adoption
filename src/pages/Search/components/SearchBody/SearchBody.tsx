import s from "./SearchBody.module.css";
import PetList from "./components/PetList/PetList";
import FiltersApplied from "./components/FiltersApplied/FiltersApplied";
import MobileFilters from "./components/MobileFilters/MobileFilters";
const SearchBody = () => {
  return (
    <>
      <h2 className={s.heading}>Find pets for adoption in North America</h2>
      <MobileFilters />
      <FiltersApplied />
      <PetList />
    </>
  );
};

export default SearchBody;
