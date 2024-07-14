import { useEffect, useState } from "react";
import Filters from "../../../Filters/Filters";
import s from "./MobileFilters.module.css";
import filtersIcon from "../../../../../../assets/svgs/filters.svg";
import CloseIcon from "../../../../../../components/Icons/CloseIcon";
import { useValidParams } from "../../../../context/ValidParamsContext/context";
const MobileFilters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { params } = useValidParams();
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
