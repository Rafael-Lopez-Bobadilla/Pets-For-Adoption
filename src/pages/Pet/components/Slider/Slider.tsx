import { Swiper, SwiperSlide } from 'swiper/react';
import { Zoom, Navigation, Pagination } from 'swiper/modules';
import s from './Slider.module.css'
import { Pet } from '../../../Search/components/SearchBody/PetList/utils/IPets';
const Slider = ({ pet, open }: { pet: Pet, open?: boolean }) => {
  return (
    <Swiper zoom={true}
      navigation={true}
      pagination={{
        clickable: true,
      }}
      modules={[Zoom, Navigation, Pagination]}
    >
      {pet.photos.map((photo, index) => {
        return (
          <SwiperSlide key={index}>
            <div className="swiper-zoom-container">
              <div className={s.slide}>
                <img src={photo.full} className={open ? `${s.img} ${s.full}` : s.img} />
              </div>
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}

export default Slider