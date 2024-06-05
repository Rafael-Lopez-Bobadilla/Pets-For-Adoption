import s from "./NoUserDialog.module.css";
import { Dialog } from "@mui/material";
import { useDialogUpdaterContext } from "../DialogProvider/DialogProvider";
type Props = {
  openNUDialog: boolean;
  setOpenNUDialog: React.Dispatch<React.SetStateAction<boolean>>;
};
const NoUserDialog = ({ openNUDialog, setOpenNUDialog }: Props) => {
  const { openDialog } = useDialogUpdaterContext();
  const openAuthDialog = (type: string) => {
    setOpenNUDialog(false);
    openDialog(type);
  };
  return (
    <Dialog open={openNUDialog} onClose={() => setOpenNUDialog(false)}>
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
