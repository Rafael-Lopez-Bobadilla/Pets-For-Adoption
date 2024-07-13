import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Filters from "../../../Filters/Filters";
import s from "./MobileFilters.module.css";
import filtersIcon from "../../../../../../assets/svgs/filters.svg";
import CloseIcon from "../../../../../../components/Icons/CloseIcon";
const MobileFilters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [params] = useSearchParams();
  useEffect(() => {
    if (isOpen) setIsOpen(false);
  }, [params]);
  return (
    <>
      <button className={s.button} onClick={() => setIsOpen(true)}>
        Filters
        <img src={filtersIcon} />
      </button>
      {isOpen && (
        <div className={s.overlay}>
          <div className={s.filters}>
            <Filters />
          </div>
          <div onClick={() => setIsOpen(false)} className={s.close}>
            <CloseIcon color="black" width="25px" />
          </div>
        </div>
      )}
    </>
  );
};

export default MobileFilters;
