import s from "./ErrorDialog.module.css";
import { useDialog } from "../../context/DialogProvider/DialogProvider";
const ErrorDialog = ({ message }: { message: string }) => {
  const { closeDialog } = useDialog();
  return (
    <div className={s.dialog}>
      <h3>Something went wrong!</h3>
      <p>{message}</p>
      <button onClick={closeDialog}>OK</button>
    </div>
  );
};

export default ErrorDialog;
