import { Pet } from '../../utils/IPets'
import s from './PetCard.module.css'
import favorite from '../../../../../../../assets/svgs/favorite.svg'
import favoriteFilled from '../../../../../../../assets/svgs/favoriteFilled.svg'
import noImage from '../../../../../../../assets/svgs/noImage.svg'
import { useSearchParams } from "react-router-dom"
import { useContext, useState } from 'react'
import { UserContext } from '../../../../../../../components/UserProvider/UserProvider'
import { updateFavorites } from './updateFavorites'
import { useNavigate } from 'react-router-dom'
import NoUserDialog from '../../../../../../../components/NoUserDialog/NoUserDialog'
const PetCard = ({ pet }: { pet: Pet }) => {
  const [params] = useSearchParams()
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const onHeartClick = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) => {
    e.stopPropagation()
    if (!user) {
      setOpen(true)
      return
    }
    const updatedUser = await updateFavorites(id)
    setUser(updatedUser)
  }
  return (
    <>
      <div className={s.card} onClick={() => navigate(`/pet/${pet.id}`)}>
        <div className={s.container}>
          <div className={s.overlay}></div>
          {pet.primary_photo_cropped ? <img className={s.petImg} src={pet.primary_photo_cropped.full} /> :
            <>
              <img src={noImage} className={s.noImg} />
              <p>No photo available for this pet</p>
            </>
          }
        </div>
        <div className={s.info}>
          <h3>{`${pet.name.charAt(0).toUpperCase()}${pet.name.slice(1).toLowerCase()}`}</h3>
          <p><span>{pet.age}</span>|<span>{pet.gender}</span></p>
          <p>{pet.breeds.primary}</p>
          {params.has('location') && <p>{Math.round(pet.distance)} miles away</p>}
        </div>
        <div className={s.heart} onClick={(e) => onHeartClick(e, pet.id)}>
          <img src={user?.favorites.includes(pet.id.toString()) ?
            favoriteFilled : favorite} />
        </div>
      </div>
      <NoUserDialog openDialog={open} setOpenDialog={setOpen} />
    </>
  )
}

export default PetCard