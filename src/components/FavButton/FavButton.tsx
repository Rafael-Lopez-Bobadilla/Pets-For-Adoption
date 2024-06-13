import favorite from "../../assets/svgs/favorite.svg";
import favoriteFilled from "../../assets/svgs/favoriteFilled.svg";
import { useUserContext } from "../UserProvider/UserProvider";
import s from "./FavButton.module.css";
import { updateFavorites } from "./updateFavorites";
import { Tooltip } from "@mui/material";
import NoUserDialog from "../NoUserDialog/NoUserDialog";
import { useState } from "react";
type Props = {
  id: number;
  background: string;
};
const FavButton = ({ id, background }: Props) => {
  const { user, updateUser } = useUserContext();
  const [openDialog, setOpenDialog] = useState(false);
  const closeDialog = () => {
    setOpenDialog(false);
  };
  const onHeartClick = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number
  ) => {
    e.stopPropagation();
    if (!user) {
      setOpenDialog(true);
      return;
    }
    const updatedUser = await updateFavorites(id);
    updateUser(updatedUser);
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
          onClick={(e) => onHeartClick(e, id)}
          style={{ backgroundColor: background }}
        >
          <img src={isFavorite ? favoriteFilled : favorite} />
        </div>
      </Tooltip>
      <NoUserDialog open={openDialog} closeDialog={closeDialog} />
    </>
  );
};

export default FavButton;
