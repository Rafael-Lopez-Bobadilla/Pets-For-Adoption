import { useState } from "react";
import { userUserUpdate } from "../../../../../context/UserContext/updateContext";
import s from "./Username.module.css";
import bs from "../../button.module.css";
import arrow from "../../../../../assets/svgs/triangleDown.svg";
import { useDialogUpdate } from "../../../../../context/DialogContext/context";
import UserIcon from "../../../../Icons/UserIcon";
import { useAsync } from "../../../../../hooks/useAsync";
import { useSnackbar } from "../../../../../context/SnackbarContext/context";
const Username = ({ name }: { name: string | null }) => {
  const [open, setOpen] = useState(false);
  const { logout } = userUserUpdate();
  const { showError } = useDialogUpdate();
  const { showSnackbar } = useSnackbar();
  const onError = () => showError("Unsuccessful Log out");
  const onSuccess = () => {
    setOpen(false);
    showSnackbar("Logout Successful");
  };
  const { asyncCall } = useAsync({
    asyncFunc: logout,
    onError,
    onSuccess,
  });
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
          onClick={asyncCall}
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
