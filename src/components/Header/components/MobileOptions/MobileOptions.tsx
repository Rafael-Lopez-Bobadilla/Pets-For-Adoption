import s from "./MobileOptions.module.css";
import { useDialogUpdate } from "../../../../context/DialogContext/context";
import { useUser } from "../../../../context/UserContext/context";
import FavButton from "../FavButton/FavButton";
import { useState } from "react";
import UserIcon from "../../../Icons/UserIcon";
import OptionsToggle from "./OptionsToggle/OptionsToggle";
import { userUserUpdate } from "../../../../context/UserContext/updateContext";
import ErrorDialog from "../../../ErrorDialog/ErrorDialog";
const MobileOptions = () => {
  const [open, setOpen] = useState(false);
  const { showSignUp, showLogIn } = useDialogUpdate();
  const { user } = useUser();
  const { logout } = userUserUpdate();
  const { showDialog } = useDialogUpdate();
  const toggle = () => {
    setOpen(!open);
  };
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
      <OptionsToggle open={open} toggle={toggle} />
      <div className={s.dropMenu}>
        {user && (
          <button className={s.user}>
            <UserIcon color="#d3d3d3" width="25px" />
            <span className={s.name}>{user?.name}</span>
          </button>
        )}
        <FavButton icon={false} />
        {!user && (
          <>
            <button onClick={() => showSignUp()}>Sign Up</button>
            <button onClick={() => showLogIn()}>Log In</button>
          </>
        )}
        {user && <button onClick={onLogout}>Log out</button>}
      </div>
    </>
  );
};

export default MobileOptions;
