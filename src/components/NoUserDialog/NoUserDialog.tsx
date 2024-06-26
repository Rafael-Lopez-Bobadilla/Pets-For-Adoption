import s from "./NoUserDialog.module.css";
import { Dialog } from "@mui/material";
import { useDialog } from "../../context/DialogProvider/DialogProvider";
import LogIn from "../AuthForms/LogIn/LogIn";
import SignUp from "../AuthForms/SignUp/SignUp";
type Props = {
  open: boolean;
  closeDialog: () => void;
};
const NoUserDialog = ({ open, closeDialog }: Props) => {
  const { showDialog } = useDialog();
  const closeAndStop = (e: any) => {
    e.stopPropagation();
    closeDialog();
  };
  return (
    <Dialog
      open={open}
      onClose={(e) => closeAndStop(e)}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={s.noUser}>
        <h3>Join us to select favorite pets!</h3>
        <p>
          <span onClick={() => showDialog("Log In", <LogIn />)}>Log in</span>
          {" or "}
          <span onClick={() => showDialog("Sign Up", <SignUp />)}>
            Create an account
          </span>
        </p>
      </div>
    </Dialog>
  );
};

export default NoUserDialog;
