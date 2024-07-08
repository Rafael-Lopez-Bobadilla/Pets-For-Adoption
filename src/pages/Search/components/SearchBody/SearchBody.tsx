import s from "./SearchBody.module.css";
import PetList from "./PetList/PetList";
import filters from "../../../../assets/svgs/filters.svg";
import FiltersApplied from "./FiltersApplied/FiltersApplied";
import { useEffect, useState } from "react";
import Filters from "../Filters/Filters";
import closeBlack from "../../../../assets/svgs/closeBlack.svg";
import Pagination from "./Pagination/Pagination";
import { useSearchParams } from "react-router-dom";
const SearchBody = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [params] = useSearchParams();
  useEffect(() => {
    if (isOpen) setIsOpen(false);
  }, [params]);
  return (
    <>
      <h2 className={s.heading}>Find pets for adoption in North America</h2>
      <button className={s.button} onClick={() => setIsOpen(true)}>
        Filters
        <img src={filters} />
      </button>
      {isOpen && (
        <div className={s.overlay}>
          <div className={s.filters}>
            <Filters />
          </div>
          <img src={closeBlack} onClick={() => setIsOpen(false)} />
        </div>
      )}
      <FiltersApplied />
      <PetList setPageCount={setPageCount} />
      <Pagination pageCount={pageCount} />
    </>
  );
};

export default SearchBody;
