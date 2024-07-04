import s from "./HeaderDropMenu.module.css";
import { useDialogUpdate } from "../../../../context/DialogContext/context";
import userIconGray from "../../../../assets/svgs/userIconGray.svg";
import { useUser } from "../../../../context/UserContext/context";
import { userUserUpdate } from "../../../../context/UserContext/updateContext";
import FavButton from "../FavButton/FavButton";
import { useNavigate } from "react-router-dom";
const DropMenu = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { showSignUp, showLogIn } = useDialogUpdate();
  const { user } = useUser();
  const { logout } = userUserUpdate();
  const navigate = useNavigate();
  const onLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
      if (location.pathname === "/favorites") navigate("/search");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={s.dropMenu}>
      {user && (
        <button className={s.user}>
          <img src={userIconGray} className={s.userIcon} />
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
  );
};

export default DropMenu;
