import s from "./PetCard.module.css";
import { useNavigate } from "react-router-dom";
import FavButton from "../../../../../../../../components/FavButton/FavButton";
import PetCardImg from "./PetCardImg/PetCardImg";
import PetCardInfo from "./PetCardInfo/PetCardInfo";
import { TPet } from "../../../../../../../../services/petfinderService/schemas/PetsSchema";
const PetCard = ({ pet }: { pet: TPet }) => {
  const navigate = useNavigate();
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
          <FavButton id={pet.id} background="white" />
        </div>
      </div>
    </>
  );
};

export default PetCard;
