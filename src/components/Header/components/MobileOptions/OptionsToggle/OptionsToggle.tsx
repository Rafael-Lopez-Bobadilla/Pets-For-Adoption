import menu from "../../../../../assets/svgs/menu.svg";
import Close from "../../../../Icons/Close";
import s from "./OptionsToggle.module.css";
type Props = {
  open: boolean;
  toggle: () => void;
};
const OptionsToggle = ({ open, toggle }: Props) => {
  if (!open)
    return (
      <button className={s.button} onClick={toggle}>
        <img src={menu} />
      </button>
    );
  if (open)
    return (
      <button className={s.button} onClick={toggle}>
        <Close color="white" width="30px" />
      </button>
    );
};

export default OptionsToggle;
