import s from "./MobileOptions.module.css";
import bs from "../button.module.css";
import { useUser } from "../../../../context/UserContext/context";
import FavButton from "../FavButton/FavButton";
import { useState } from "react";
import UserIcon from "../../../Icons/UserIcon";
import CloseIcon from "../../../Icons/CloseIcon";
import menu from "../../../../assets/svgs/menu.svg";
import AuthOptions from "../AuthOptions/AuthOptions";
import Logout from "../Logout/Logout";
const MobileOptions = () => {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
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
              <UserIcon color="gray" width="25px" />
              <span className={s.name}>{user.name}</span>
            </div>
          )}
          <div onClick={() => setOpen(false)}>
            <FavButton />
          </div>
          {!user && <AuthOptions />}
          {user && (
            <div onClick={() => setOpen(false)}>
              <Logout />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MobileOptions;
