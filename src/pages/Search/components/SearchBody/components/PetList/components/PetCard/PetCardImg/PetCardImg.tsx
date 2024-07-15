import s from "./PetCardImg.module.css";
import noImage from "../../../../../../../../../assets/svgs/noImage.svg";
import {
  TPrimaryPhoto,
  TPhotos,
} from "../../../../../../../../../services/petfinderService/schemas/PetsSchema";
import { memo } from "react";
const PetCardImg = memo(
  ({
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
            <img src={noImage} className={s.noImg} />
            <p>No photo available for this pet</p>
          </>
        )}
      </div>
    );
  }
);

export default PetCardImg;
