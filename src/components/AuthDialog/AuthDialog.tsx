import { Dialog } from "@mui/material";
import {
  useDialogContext,
  useDialogUpdaterContext,
} from "../DialogProvider/DialogProvider";
import SignUp from "./components/SignUp/SignUp";
import LogIn from "./components/LogIn/LogIn";
import closeBlack from "../../assets/svgs/closeBlack.svg";
import s from "./AuthDialog.module.css";
import GoogleButton from "./components/GoogleButton/GoogleButton";
const AuthDialog = () => {
  const { open, type } = useDialogContext();
  const { closeDialog } = useDialogUpdaterContext();
  return (
    <Dialog open={open} onClose={closeDialog} scroll="body" keepMounted={true}>
      <div className={s.container} style={{ display: open ? "block" : "none" }}>
        {type === "signup" && <h3>Sign Up</h3>}
        {type === "login" && <h3>Log In</h3>}
        <GoogleButton />
        {type === "signup" && <SignUp />}
        {type === "login" && <LogIn />}
        <img src={closeBlack} className={s.close} onClick={closeDialog} />
      </div>
    </Dialog>
  );
};

export default AuthDialog;
