import s from "./Options.module.css";
import { useUser } from "../../../../context/UserContext/context";
import FavButton from "../FavButton/FavButton";
import Username from "./Username/Username";
import AuthOptions from "../AuthOptions/AuthOptions";

const Options = () => {
  const { user } = useUser();
  return (
    <div className={s.options}>
      <FavButton />
      <div className={s.line}></div>
      {!user && <AuthOptions />}
      {user && <Username name={user.name} />}
    </div>
  );
};

export default Options;
