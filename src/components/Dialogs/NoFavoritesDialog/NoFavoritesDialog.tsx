import s from "./NoFavoritesDialog.module.css";
import { useDialogUpdate } from "../../../context/DialogContext/context";
import HeartIcon from "../../Icons/HeartIcon/HeartIcon";
const NoFavoritesDialog = () => {
  const { closeDialog } = useDialogUpdate();
  return (
    <div className={s.noFav}>
      <h3>No favorites yet</h3>
      <p>
        {
          "When you find a pet you like, add it your favorites list by tapping the "
        }
        <div>
          <HeartIcon style={"bordered"} />
        </div>
      </p>
      <button onClick={closeDialog}>OK</button>
    </div>
  );
};

export default NoFavoritesDialog;
