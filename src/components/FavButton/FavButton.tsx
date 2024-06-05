import favorite from "../../assets/svgs/favorite.svg";
import favoriteFilled from "../../assets/svgs/favoriteFilled.svg";
import { useUserContext } from "../UserProvider/UserProvider";
import s from "./FavButton.module.css";
import { Pet } from "../../pages/Search/components/SearchBody/PetList/utils/IPets";
import { updateFavorites } from "./updateFavorites";
import { Tooltip } from "@mui/material";
type Props = {
  pet: Pet;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  background: string;
};
const FavButton = ({ pet, setOpen, background }: Props) => {
  const { user, updateUser } = useUserContext();
  const onHeartClick = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number
  ) => {
    e.stopPropagation();
    if (!user) {
      setOpen(true);
      return;
    }
    const updatedUser = await updateFavorites(id);
    updateUser(updatedUser);
  };
  const isFavorite = user?.favorites.includes(pet.id.toString());
  return (
    <Tooltip
      title={isFavorite ? "Remove From Favorites" : "Add To Favorites"}
      placement="left"
      sx={{ fontSize: "24px" }}
    >
      <div
        className={s.heart}
        onClick={(e) => onHeartClick(e, pet.id)}
        style={{ backgroundColor: background }}
      >
        <img src={isFavorite ? favoriteFilled : favorite} />
      </div>
    </Tooltip>
  );
};

export default FavButton;
