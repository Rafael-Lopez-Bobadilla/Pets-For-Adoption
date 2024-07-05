import { useState } from "react";
import { userUserUpdate } from "../../../../../context/UserContext/updateContext";
import s from "./Username.module.css";
import bs from "../../button.module.css";
import arrow from "../../../../../assets/svgs/triangleDown.svg";
import { useDialogUpdate } from "../../../../../context/DialogContext/context";
import ErrorDialog from "../../../../Dialogs/ErrorDialog/ErrorDialog";
import UserIcon from "../../../../Icons/UserIcon";
const Username = ({ name }: { name: string | null }) => {
  const [open, setOpen] = useState(false);
  const { logout } = userUserUpdate();
  const { showDialog } = useDialogUpdate();
  const onLogout = async () => {
    try {
      await logout();
      setOpen(false);
    } catch (err) {
      showDialog("", <ErrorDialog message="Unsuccessful Log out" />);
    }
  };
  return (
    <div className={s.user}>
      <button
        className={`${bs.button} ${s.name}`}
        onClick={() => setOpen(!open)}
        onBlur={() => setOpen(false)}
      >
        <UserIcon color="white" width="25px" />
        <span>{name}</span>
        <img src={arrow} className={s.arrow} />
      </button>
      {open && (
        <button
          onClick={onLogout}
          onMouseDown={(e) => e.preventDefault()}
          className={`${s.logout} ${bs.button}`}
        >
          Log out
        </button>
      )}
    </div>
  );
};

export default Username;
