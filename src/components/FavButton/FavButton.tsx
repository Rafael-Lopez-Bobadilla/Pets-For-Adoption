import { useUser } from "../../context/UserContext/context";
import s from "./FavButton.module.css";
import { Tooltip } from "@mui/material";
import NoUserDialog from "../Dialogs/NoUserDialog/NoUserDialog";
import { useDialogUpdate } from "../../context/DialogContext/context";
import { TUpdateAction } from "../../services/userService/userService";
import HeartIcon from "../Icons/HeartIcon/HeartIcon";
import { AxiosError } from "axios";
type Props = {
  id: number;
  background: "white" | "gray";
};
const FavButton = ({ id, background }: Props) => {
  const { user, clearUser, updateFavorites } = useUser();
  const { showDialog, showError } = useDialogUpdate();
  const onHeartClick = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number,
    action: TUpdateAction
  ) => {
    e.preventDefault();
    if (!user) {
      showDialog("", <NoUserDialog />);
    } else {
      try {
        await updateFavorites(id, action);
      } catch (err) {
        if (err instanceof AxiosError && err.response?.status === 401) {
          showError("Session Expired");
          clearUser();
        } else {
          showError("Unable to update favorites");
        }
      }
    }
  };
  const isFavorite = user?.favorites.includes(id.toString());
  return (
    <Tooltip
      title={isFavorite ? "Remove From Favorites" : "Add To Favorites"}
      placement="left"
      sx={{ fontSize: "24px" }}
    >
      <div
        className={s.heart}
        onClick={(e) => onHeartClick(e, id, isFavorite ? "remove" : "add")}
        style={{
          backgroundColor: `${background === "white" ? "white" : "#e6dede"}`,
        }}
      >
        <HeartIcon style={isFavorite ? "filledGreen" : "bordered"} />
      </div>
    </Tooltip>
  );
};

export default FavButton;
