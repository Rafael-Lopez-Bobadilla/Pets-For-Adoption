import s from "./PetCard.module.css";
import FavButton from "../../../../../../../../components/FavButton/FavButton";
import PetCardImg from "./PetCardImg/PetCardImg";
import PetCardInfo from "./PetCardInfo/PetCardInfo";
import { TPet } from "../../../../../../../../services/petfinderService/schemas/PetsSchema";
import { Link } from "react-router-dom";
const PetCard = ({
  children = <></>,
  pet,
}: {
  children?: React.ReactNode;
  pet: TPet;
}) => {
  return (
    <>
      <Link to={`/pet/${pet.id}`}>
        <div className={s.card}>
          <PetCardImg
            primary_photo={pet.primary_photo_cropped}
            photos={pet.photos}
          />
          <PetCardInfo
            name={pet.name}
            age={pet.age}
            gender={pet.gender}
            breeds={pet.breeds}
          >
            {children}
          </PetCardInfo>
          <div className={s.heart}>
            <FavButton id={pet.id} background={"white"} />
          </div>
        </div>
      </Link>
    </>
  );
};

export default PetCard;
