import { useLocation } from "../../../../context/LocationContext/context";
import s from "./MobileBar.module.css";
import pencil from "../../../../../../assets/svgs/pencil.svg";
import { useEffect, useState } from "react";
import OverlaySearch from "./OverlaySearch/OverlaySearch";
import { useValidParams } from "../../../../context/ValidParamsContext/context";
const MobileBar = () => {
  const { params } = useValidParams();
  const { location } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const closeOverlay = () => setIsOpen(false);
  useEffect(() => {
    if (isOpen) closeOverlay();
  }, [params]);
  const type = () => {
    const paramsType = params?.type;
    if (!paramsType) return "Pets";
    if (paramsType === "Barnyard" || paramsType === "Small & Furry")
      return `${paramsType} animals`;
    return `${paramsType}s`;
  };
  return (
    <div className={s.wrapper}>
      <span className={s.message}>
        {type()} for adoption in {location ? location.address : "North America"}
      </span>
      <img src={pencil} onClick={() => setIsOpen(true)} />
      {isOpen && <OverlaySearch closeOverlay={closeOverlay} />}
    </div>
  );
};

export default MobileBar;
