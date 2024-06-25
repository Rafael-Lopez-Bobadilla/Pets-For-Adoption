import s from "./NoUserDialog.module.css";
import { Dialog } from "@mui/material";
import { useAuthDialogUpdater } from "../../context/DialogProvider/DialogProvider";
type Props = {
  open: boolean;
  closeDialog: () => void;
};
const NoUserDialog = ({ open, closeDialog }: Props) => {
  const { openDialog } = useAuthDialogUpdater();
  const openAuthDialog = (type: string) => {
    closeDialog();
    openDialog(type);
  };
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
          <span onClick={() => openAuthDialog("login")}>Log in</span>
          {" or "}
          <span onClick={() => openAuthDialog("signup")}>
            Create an account
          </span>
        </p>
      </div>
    </Dialog>
  );
};

export default NoUserDialog;
