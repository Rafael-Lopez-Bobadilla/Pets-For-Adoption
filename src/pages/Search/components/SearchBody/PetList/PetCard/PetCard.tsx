import { Pet } from "../utils/IPets"
import s from './PetCard.module.css'
import favorite from '../../../../../../assets/svgs/favorite.svg'
const PetCard = ({ pet }: { pet: Pet }) => {
  return (
    <div className={s.card}>
      <div className={s.container}>
        {pet.primary_photo_cropped && <img src={pet.primary_photo_cropped.full} />}
      </div>
      <div className={s.info}>
        <h3>{`${pet.name.charAt(0).toUpperCase()}${pet.name.slice(1).toLowerCase()}`}</h3>
        <p><span>{pet.age}</span>|<span>{pet.gender}</span></p>
        <p>{pet.breeds.primary}</p>
      </div>
      <div className={s.heart}><img src={favorite} /></div>
    </div>
  )
}

export default PetCard