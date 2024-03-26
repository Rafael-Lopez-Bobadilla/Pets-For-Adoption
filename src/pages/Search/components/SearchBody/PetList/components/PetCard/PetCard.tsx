import { Pet } from '../../utils/IPets'
import s from './PetCard.module.css'
import noImage from '../../../../../../../assets/svgs/noImage.svg'
import { useSearchParams } from "react-router-dom"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NoUserDialog from '../../../../../../../components/NoUserDialog/NoUserDialog'
import FavButton from '../../../../../../../components/FavButton/FavButton'
const PetCard = ({ pet }: { pet: Pet }) => {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className={s.card} onClick={() => navigate(`/pet/${pet.id}`)}>
        <div className={s.container}>
          <div className={s.overlay}></div>
          {pet.primary_photo_cropped && <img className={s.petImg} src={pet.primary_photo_cropped.full} />}
          {!pet.primary_photo_cropped && pet.photos[0]?.full && <img className={s.petImg} src={pet.photos[0].full} />}
          {(!pet.primary_photo_cropped && !pet.photos[0]?.full) && <>
            <img src={noImage} className={s.noImg} />
            <p>No photo available for this pet</p>
          </>}
        </div>
        <div className={s.info}>
          <h3>{`${pet.name.charAt(0).toUpperCase()}${pet.name.slice(1).toLowerCase()}`}</h3>
          <p><span>{pet.age}</span>|<span>{pet.gender}</span></p>
          <p>{pet.breeds.primary}</p>
          {params.has('location') && <p>{Math.round(pet.distance)} miles away</p>}
        </div>
        <div className={s.heartCont}>
          <FavButton pet={pet} setOpen={setOpen} background='white' />
        </div>
      </div>
      <NoUserDialog openDialog={open} setOpenDialog={setOpen} />
    </>
  )
}

export default PetCard