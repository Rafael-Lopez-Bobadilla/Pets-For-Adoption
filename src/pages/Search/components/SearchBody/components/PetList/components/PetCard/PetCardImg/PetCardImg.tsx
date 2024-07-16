import s from "./PetCardImg.module.css";
import {
  TPrimaryPhoto,
  TPhotos,
} from "../../../../../../../../../services/petfinderService/schemas/PetsSchema";
import PetIcon from "../../../../../../../../../components/Icons/PetIcon/PetIcon";
const PetCardImg = ({
  primary_photo,
  photos,
}: {
  primary_photo: TPrimaryPhoto;
  photos: TPhotos;
}) => {
  return (
    <div className={s.container}>
      <div className={s.overlay}></div>
      {primary_photo && <img className={s.petImg} src={primary_photo.full} />}
      {!primary_photo && photos[0]?.full && (
        <img className={s.petImg} src={photos[0].full} />
      )}
      {!primary_photo && !photos[0]?.full && (
        <>
          <div className={s.noImg}>
            <PetIcon color={"green"} />
          </div>
          <p>No photo available for this pet</p>
        </>
      )}
    </div>
  );
};

export default PetCardImg;
