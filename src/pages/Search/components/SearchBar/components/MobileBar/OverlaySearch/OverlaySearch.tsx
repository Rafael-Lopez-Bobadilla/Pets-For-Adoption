import s from "./OverlaySearch.module.css";
import PlacesInput from "../../../../PlacesInput/PlacesInput";
import TypesSelect from "../../TypesSelect/TypesSelect";
import CloseIcon from "../../../../../../../components/Icons/CloseIcon";
const OverlaySearch = ({ closeOverlay }: { closeOverlay: () => void }) => {
  return (
    <div className={s.overlay}>
      <div>
        <span>Pet Type</span>
        <TypesSelect />
      </div>
      <div>
        <span>
          Location
          <p>{"(Only places in North America)"}</p>
        </span>
        <PlacesInput />
      </div>
      <div onClick={closeOverlay} className={s.icon}>
        <CloseIcon width="25px" color="black" />
      </div>
    </div>
  );
};

export default OverlaySearch;
