import s from "./MobileOptions.module.css";
import bs from "../button.module.css";
import { useDialogUpdate } from "../../../../context/DialogContext/context";
import { useUser } from "../../../../context/UserContext/context";
import FavButton from "../FavButton/FavButton";
import { useState } from "react";
import UserIcon from "../../../Icons/UserIcon";
import CloseIcon from "../../../Icons/CloseIcon";
import menu from "../../../../assets/svgs/menu.svg";
import { userUserUpdate } from "../../../../context/UserContext/updateContext";
import ErrorDialog from "../../../Dialogs/ErrorDialog/ErrorDialog";
import AuthOptions from "../AuthOptions/AuthOptions";
const MobileOptions = () => {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
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
    <>
      <button
        className={`${bs.button} ${s.toggle}`}
        onClick={() => setOpen(!open)}
      >
        {open ? <CloseIcon color="white" width="30px" /> : <img src={menu} />}
      </button>
      {open && (
        <div className={s.dropMenu}>
          {user && (
            <div className={s.user}>
              <UserIcon color="#d3d3d3" width="25px" />
              <span className={s.name}>{user.name}</span>
            </div>
          )}
          <div onClick={() => setOpen(false)}>
            <FavButton />
          </div>
          {!user && <AuthOptions />}
          {user && (
            <button onClick={onLogout} className={bs.button}>
              Log out
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default MobileOptions;
