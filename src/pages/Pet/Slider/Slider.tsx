import s from './Slider.module.css'
import { Pet } from '../../Search/components/SearchBody/PetList/utils/IPets'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Zoom, Navigation, Pagination } from 'swiper/modules';
import expand from '../../../assets/svgs/expand.svg'
import close from '../../../assets/svgs/close.svg'
import { Dialog } from '@mui/material'
import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiper.css'
import { useState } from 'react'
const Slider = ({ pet }: { pet: Pet }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className={s.container}>
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
                  <img src={photo.full} className={s.img} />
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
      <img src={expand} className={s.expand} onClick={() => setOpen(true)} />
      <Dialog open={open} fullScreen={true}>
        <div className={s.dc}>
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
                      <img src={photo.full} className={s.img} />
                    </div>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
          <img src={close} className={s.close} onClick={() => setOpen(false)} />
        </div>
      </Dialog>
    </div>
  )
}

export default Slider