import s from "./NoUserDialog.module.css";
import { useDialogUpdate } from "../../context/DialogContext/context";

const NoUserDialog = () => {
  const { showSignUp, showLogIn } = useDialogUpdate();
  return (
    <div className={s.noUser}>
      <h3>Join us to select favorite pets!</h3>
      <p>
        <span onClick={() => showLogIn()}>Log in</span>
        {" or "}
        <span onClick={() => showSignUp()}>Create an account</span>
      </p>
    </div>
  );
};

export default NoUserDialog;
