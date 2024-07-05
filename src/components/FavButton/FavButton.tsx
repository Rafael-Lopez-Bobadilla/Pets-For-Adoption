import favorite from "../../assets/svgs/favorite.svg";
import favoriteFilled from "../../assets/svgs/favoriteFilled.svg";
import { useUser } from "../../context/UserContext/context";
import { userUserUpdate } from "../../context/UserContext/updateContext";
import s from "./FavButton.module.css";
import { Tooltip } from "@mui/material";
import NoUserDialog from "../Dialogs/NoUserDialog/NoUserDialog";
import { useDialogUpdate } from "../../context/DialogContext/context";
type Props = {
  id: number;
  background: "white" | "#e6dede";
};
const FavButton = ({ id, background }: Props) => {
  const { user } = useUser();
  const { updateFavorites } = userUserUpdate();
  const { showDialog } = useDialogUpdate();
  const onHeartClick = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number,
    action: "add" | "remove"
  ) => {
    e.stopPropagation();
    if (!user) {
      showDialog("", <NoUserDialog />);
      return;
    }
    try {
      await updateFavorites(id, action);
    } catch (err) {
      console.log(err);
    }
  };
  const isFavorite = user?.favorites.includes(id.toString());
  return (
    <>
      <Tooltip
        title={isFavorite ? "Remove From Favorites" : "Add To Favorites"}
        placement="left"
        sx={{ fontSize: "24px" }}
      >
        <div
          className={s.heart}
          onClick={(e) => onHeartClick(e, id, isFavorite ? "remove" : "add")}
          style={{ backgroundColor: background }}
        >
          <img src={isFavorite ? favoriteFilled : favorite} />
        </div>
      </Tooltip>
    </>
  );
};

export default FavButton;
