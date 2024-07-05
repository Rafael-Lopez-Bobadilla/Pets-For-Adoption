import s from "./NoFavoritesDialog.module.css";
import { useDialogUpdate } from "../../../context/DialogContext/context";
import HeartIcon from "../../Icons/HeartIcon";
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
          <HeartIcon width="25px" color="transparent" border="#267C5B" />
        </div>
      </p>
      <button onClick={closeDialog}>OK</button>
    </div>
  );
};

export default NoFavoritesDialog;
