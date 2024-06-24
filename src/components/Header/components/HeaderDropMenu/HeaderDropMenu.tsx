import s from "./HeaderDropMenu.module.css";
import { useDialogUpdaterContext } from "../../../../context/DialogProvider/DialogProvider";
import userIconGray from "../../../../assets/svgs/userIconGray.svg";
import { useUserContext } from "../../../../context/UserProvider/UserProvider";
import { logout } from "../../../../services/userService";
import FavButton from "../FavButton/FavButton";
import { useNavigate } from "react-router-dom";
const DropMenu = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { openDialog } = useDialogUpdaterContext();
  const { user, updateUser } = useUserContext();
  const navigate = useNavigate();
  const onLogout = async () => {
    try {
      await logout();
      updateUser(null);
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
          <button onClick={() => openDialog("signup")}>Sign Up</button>
          <button onClick={() => openDialog("login")}>Log In</button>
        </>
      )}
      {user && <button onClick={onLogout}>Log out</button>}
    </div>
  );
};

export default DropMenu;
