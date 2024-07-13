import s from "./SearchBody.module.css";
import PetList from "./components/PetList/PetList";
import FiltersApplied from "./components/FiltersApplied/FiltersApplied";
import { useState } from "react";
import Pagination from "./components/Pagination/Pagination";
import MobileFilters from "./components/MobileFilters/MobileFilters";
const SearchBody = () => {
  const [pageCount, setPageCount] = useState(0);
  return (
    <>
      <h2 className={s.heading}>Find pets for adoption in North America</h2>
      <MobileFilters />
      <FiltersApplied />
      <PetList setPageCount={setPageCount} />
      <Pagination pageCount={pageCount} />
    </>
  );
};

export default SearchBody;
