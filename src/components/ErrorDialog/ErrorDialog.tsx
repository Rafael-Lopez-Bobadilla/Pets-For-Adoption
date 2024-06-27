import s from "./ErrorDialog.module.css";
import { useDialogUpdate } from "../../context/DialogProvider/context";
const ErrorDialog = ({ message }: { message: string }) => {
  const { closeDialog } = useDialogUpdate();
  return (
    <div className={s.dialog}>
      <h3>Something went wrong!</h3>
      <p>{message}</p>
      <button onClick={closeDialog}>OK</button>
    </div>
  );
};

export default ErrorDialog;
