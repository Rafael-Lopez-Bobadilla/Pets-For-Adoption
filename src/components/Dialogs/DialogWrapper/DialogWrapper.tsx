import { Dialog as MuiDialog } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import GoogleButton from "./GoogleButton/GoogleButton";
import {
  useDialog,
  useDialogUpdate,
} from "../../../context/DialogContext/context";
import s from "./DialogWrapper.module.css";
const DialogWrapper = () => {
  const { open, title, content } = useDialog();
  const { closeDialog } = useDialogUpdate();
  const isAuthDialog = title === "Sign Up" || title === "Log In";
  return (
    <MuiDialog
      open={open}
      onClose={closeDialog}
      keepMounted={true}
      scroll="body"
    >
      <div className={isAuthDialog ? s.dialog : ""}>
        <h3>{title}</h3>
        <div style={{ display: isAuthDialog ? "block" : "none" }}>
          <GoogleButton />
        </div>
        {content}
        {isAuthDialog && (
          <div className={s.close} onClick={closeDialog}>
            <CloseRoundedIcon fontSize="medium" />
          </div>
        )}
      </div>
    </MuiDialog>
  );
};

export default DialogWrapper;
