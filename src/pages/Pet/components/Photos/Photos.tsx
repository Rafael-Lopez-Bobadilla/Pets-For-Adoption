import { Pet } from "../../../Search/components/SearchBody/PetList/utils/IPets"
import Slider from "../Slider/Slider"
import s from './Photos.module.css'
import expand from '../../../../assets/svgs/expand.svg'
import close from '../../../../assets/svgs/close.svg'
import { useState } from "react"
import { Dialog } from "@mui/material"
import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiper.css'
const Photos = ({ pet }: { pet: Pet }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className={s.container}>
      <Slider pet={pet} />
      <img src={expand} className={s.expand} onClick={() => setOpen(true)} />
      <Dialog open={open} fullScreen={true}>
        <div className={s.dc}>
          <Slider pet={pet} open={open} />
          <img src={close} className={s.close} onClick={() => setOpen(false)} />
        </div>
      </Dialog>
    </div>
  )
}

export default Photos