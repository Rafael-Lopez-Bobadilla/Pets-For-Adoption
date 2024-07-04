import { useDialogUpdate } from "../../../../context/DialogContext/context";
import s from "./AuthOption.module.css";
const AuthOptions = () => {
  const { showLogIn, showSignUp } = useDialogUpdate();
  return (
    <>
      <button onClick={() => showSignUp()} className={s.button}>
        Sign Up
      </button>
      <button onClick={() => showLogIn()} className={s.button}>
        Log In
      </button>
    </>
  );
};

export default AuthOptions;
