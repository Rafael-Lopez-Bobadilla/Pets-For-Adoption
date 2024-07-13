import { useState } from "react";
import { useUser } from "../../../../../context/UserContext/context";
import s from "./Username.module.css";
import bs from "../../button.module.css";
import arrow from "../../../../../assets/svgs/triangleDown.svg";
import { useDialogUpdate } from "../../../../../context/DialogContext/context";
import UserIcon from "../../../../Icons/UserIcon";
import { useSnackbar } from "../../../../../context/SnackbarContext/context";
const Username = ({ name }: { name: string | null }) => {
  const [open, setOpen] = useState(false);
  const { logout } = useUser();
  const { showError } = useDialogUpdate();
  const { showSnackbar } = useSnackbar();
  const handleLogout = async () => {
    try {
      await logout();
      setOpen(false);
      showSnackbar("Logout Successful");
    } catch (err) {
      showError("Unsuccessful Log out");
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
          onClick={handleLogout}
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
