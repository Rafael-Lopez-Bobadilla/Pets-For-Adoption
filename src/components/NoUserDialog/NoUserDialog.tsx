import s from "./NoUserDialog.module.css";
import { Dialog } from "@mui/material";
import { useDialogContext } from "../DialogProvider/DialogProvider";
type Props = {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
};
const NoUserDialog = ({ openDialog, setOpenDialog }: Props) => {
  const { handleDialogOpen } = useDialogContext();
  const openAuthDialog = (type: string) => {
    setOpenDialog(false);
    handleDialogOpen(type);
  };
  return (
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
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
