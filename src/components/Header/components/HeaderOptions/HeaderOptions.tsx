import s from "./HeaderOptions.module.css";
import { useDialogContext } from "../../../DialogProvider/DialogProvider";
import { useContext, useState } from "react";
import { UserContext } from "../../../UserProvider/UserProvider";
import userIcon from "../../../../assets/svgs/userIcon.svg";
import triangleDown from "../../../../assets/svgs/triangleDown.svg";
import FavButton from "../FavButton/FavButton";
import { useNavigate } from "react-router-dom";
import { logout } from "../logout";
const HeaderOptions = () => {
  const navigate = useNavigate();
  const { handleDialogOpen } = useDialogContext();
  const { user, setUser } = useContext(UserContext);
  const [openLogout, setOpenLogout] = useState(false);
  const openAuthDialog = (type: string) => {
    handleDialogOpen(type);
  };
  const onLogout = async () => {
    await logout(setUser);
    setOpenLogout(false);
    if (location.pathname === "/favorites") navigate("/search");
  };
  return (
    <div className={s.options}>
      <FavButton icon={true} />
      <div className={s.line}></div>
      {!user && (
        <>
          <button onClick={() => openAuthDialog("signup")}>Sign Up</button>
          <button onClick={() => openAuthDialog("login")}>Log In</button>
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
