import { useState } from "react";
import s from "./Username.module.css";
import bs from "../../button.module.css";
import arrow from "../../../../../assets/svgs/triangleDown.svg";
import UserIcon from "../../../../Icons/UserIcon";
import Logout from "../../Logout/Logout";
const Username = ({ name }: { name: string | null }) => {
  const [open, setOpen] = useState(false);
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
        <div
          className={s.logout}
          onClick={() => setOpen(false)}
          onMouseDown={(e) => e.preventDefault()}
        >
          <Logout />
        </div>
      )}
    </div>
  );
};

export default Username;
