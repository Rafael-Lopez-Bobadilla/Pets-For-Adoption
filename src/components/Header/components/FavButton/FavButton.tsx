import heart from "../../../../assets/svgs/heart.svg";
import s from "./FavButton.module.css";
import { useUserContext } from "../../../../context/UserProvider/UserProvider";
import { useDialogUpdate } from "../../../../context/DialogProvider/context";
import NoFavoritesDialog from "./NoFavoritesDialog/NoFavoritesDialog";
import { useNavigate } from "react-router-dom";
import NoUserDialog from "../../../NoUserDialog/NoUserDialog";
const FavButton = ({ icon }: { icon: boolean }) => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { showDialog } = useDialogUpdate();
  const handleClick = () => {
    if (!user) showDialog("", <NoUserDialog />);
    if (user && user.favorites.length === 0)
      showDialog("", <NoFavoritesDialog />);
    if (user && user.favorites.length > 0) navigate("/favorites");
  };
  return (
    <>
      <button className={s.button} onClick={handleClick}>
        {icon && <img src={heart} />}
        Favorites
      </button>
    </>
  );
};

export default FavButton;
