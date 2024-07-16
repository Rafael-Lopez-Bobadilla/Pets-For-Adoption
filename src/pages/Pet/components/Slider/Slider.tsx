import { Swiper, SwiperSlide } from "swiper/react";
import { Zoom, Navigation, Pagination } from "swiper/modules";
import s from "./Slider.module.css";
import { TPet } from "../../../../services/petfinderService/schemas/PetsSchema";
type Props = {
  pet: TPet;
  open?: boolean;
  openDialog?: () => void;
};
const Slider = ({ pet, open = false, openDialog = () => {} }: Props) => {
  let photos = [...pet.photos];
  if (pet.primary_photo_cropped && photos.length < 1)
    photos = [pet.primary_photo_cropped];
  return (
    <>
      <Swiper
        zoom={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Zoom, Navigation, Pagination]}
      >
        {photos.map((photo, index) => {
          return (
            <SwiperSlide key={index}>
              <div
                className="swiper-zoom-container"
                style={{ cursor: "pointer" }}
                onClick={openDialog}
              >
                <div className={s.slide}>
                  <img
                    src={photo.full}
                    className={open ? `${s.img} ${s.full}` : s.img}
                  />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default Slider;
