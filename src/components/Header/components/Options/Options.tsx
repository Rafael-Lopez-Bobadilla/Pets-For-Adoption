import s from "./Options.module.css";
import { useDialogUpdate } from "../../../../context/DialogContext/context";
import { useUser } from "../../../../context/UserContext/context";
import FavButton from "../FavButton/FavButton";
import Username from "./Username/Username";

const Options = () => {
  const { showSignUp, showLogIn } = useDialogUpdate();
  const { user } = useUser();
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
      {user && <Username name={user.name} />}
    </div>
  );
};

export default Options;
