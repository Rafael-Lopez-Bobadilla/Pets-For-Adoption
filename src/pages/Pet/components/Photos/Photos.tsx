import Slider from "../Slider/Slider";
import s from "./Photos.module.css";
import expand from "../../../../assets/svgs/expand.svg";
import { useState } from "react";
import { Dialog } from "@mui/material";
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./swiper.css";
import { TPet } from "../../../../services/petfinderService/schemas/PetsSchema";
import CloseIcon from "../../../../components/Icons/CloseIcon";
import PetIcon from "../../../../components/Icons/PetIcon";
const Photos = ({ pet }: { pet: TPet }) => {
  const [open, setOpen] = useState(false);
  const openDialog = () => setOpen(true);
  return (
    <div className={s.container}>
      {pet.primary_photo_cropped || pet.photos.length > 1 ? (
        <>
          <Slider pet={pet} openDialog={openDialog} />
          <img
            src={expand}
            className={s.expand}
            onClick={() => setOpen(true)}
          />
          <Dialog open={open} fullScreen={true}>
            <div className={s.content}>
              <Slider pet={pet} open={open} />
              <div onClick={() => setOpen(false)} className={s.close}>
                <CloseIcon width="40px" color="white" />
              </div>
            </div>
          </Dialog>
        </>
      ) : (
        <div className={s.noPhoto}>
          <div className={s.icon}>
            <PetIcon color={"white"} />
          </div>
          <p>No Photos available for this pet</p>
        </div>
      )}
    </div>
  );
};

export default Photos;
