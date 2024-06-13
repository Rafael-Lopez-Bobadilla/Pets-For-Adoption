import { Pet } from "../../utils/IPets";
import s from "./PetCard.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NoUserDialog from "../../../../../../../components/NoUserDialog/NoUserDialog";
import FavButton from "../../../../../../../components/FavButton/FavButton";
import PetCardImg from "./PetCardImg/PetCardImg";
import PetCardInfo from "./PetCardInfo/PetCardInfo";
const PetCard = ({ pet }: { pet: Pet }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const closeDialog = () => {
    setOpen(false);
  };
  return (
    <>
      <div className={s.card} onClick={() => navigate(`/pet/${pet.id}`)}>
        <PetCardImg
          primary_photo={pet.primary_photo_cropped}
          photos={pet.photos}
        />
        <PetCardInfo
          name={pet.name}
          age={pet.age}
          gender={pet.gender}
          distance={pet.distance}
          breeds={pet.breeds}
        />
        <div className={s.heartCont}>
          <FavButton pet={pet} setOpen={setOpen} background="white" />
        </div>
      </div>
      <NoUserDialog open={open} closeDialog={closeDialog} />
    </>
  );
};

export default PetCard;
