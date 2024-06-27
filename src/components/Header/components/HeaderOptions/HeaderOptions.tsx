import s from "./HeaderOptions.module.css";
import { useDialogUpdate } from "../../../../context/DialogProvider/DialogProvider";
import { useState } from "react";
import { useUserContext } from "../../../../context/UserProvider/UserProvider";
import userIcon from "../../../../assets/svgs/userIcon.svg";
import triangleDown from "../../../../assets/svgs/triangleDown.svg";
import FavButton from "../FavButton/FavButton";
import { logout } from "../../../../services/userService";
const HeaderOptions = () => {
  const { showSignUp, showLogIn } = useDialogUpdate();
  const { user, updateUser } = useUserContext();
  const [openLogout, setOpenLogout] = useState(false);
  const onLogout = async () => {
    try {
      await logout();
      updateUser(null);
      setOpenLogout(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={s.options}>
      <FavButton icon={true} />
      <div className={s.line}></div>
      {!user && (
        <>
          <button onClick={() => showSignUp()}>Sign Up</button>
          <button onClick={() => showLogIn()}>Log In</button>
        </>
      )}
      {user && (
        <div className={s.user}>
          <button
            onClick={() => setOpenLogout(!openLogout)}
            onBlur={() => setOpenLogout(false)}
          >
            <img src={userIcon} className={s.userIcon} />
            <span className={s.name}>{user?.name}</span>
            <img src={triangleDown} className={s.tri} />
          </button>
          {openLogout && (
            <div onClick={onLogout} onMouseDown={(e) => e.preventDefault()}>
              Log out
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderOptions;
