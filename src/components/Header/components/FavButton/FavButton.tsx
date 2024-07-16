import s from "./FavButton.module.css";
import { useUser } from "../../../../context/UserContext/context";
import { useDialogUpdate } from "../../../../context/DialogContext/context";
import NoFavoritesDialog from "../../../Dialogs/NoFavoritesDialog/NoFavoritesDialog";
import { Link } from "react-router-dom";
import NoUserDialog from "../../../Dialogs/NoUserDialog/NoUserDialog";
import HeartIcon from "../../../Icons/HeartIcon/HeartIcon";
const FavButton = () => {
  const { user } = useUser();
  const { showDialog } = useDialogUpdate();
  const handleClick = (e: React.MouseEvent) => {
    if (!user) showDialog("", <NoUserDialog />);
    if (user && user.favorites.length === 0)
      showDialog("", <NoFavoritesDialog />);
    if (!user || user.favorites.length === 0) e.preventDefault();
  };
  return (
    <Link to="/favorites">
      <div className={s.button} onClick={handleClick}>
        <div className={s.icon}>
          <HeartIcon style={"filledWhite"} />
        </div>
        <span>Favorites</span>
      </div>
    </Link>
  );
};

export default FavButton;
