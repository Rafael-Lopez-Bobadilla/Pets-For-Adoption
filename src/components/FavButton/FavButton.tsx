import favorite from '../../assets/svgs/favorite.svg'
import favoriteFilled from '../../assets/svgs/favoriteFilled.svg'
import { UserContext } from '../UserProvider/UserProvider'
import { useContext } from 'react'
import s from './FavButton.module.css'
import { Pet } from '../../pages/Search/components/SearchBody/PetList/utils/IPets'
import { updateFavorites } from './updateFavorites'
type Props = {
  pet: Pet,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  background: string
}
const FavButton = ({ pet, setOpen, background }: Props) => {
  const { user, setUser } = useContext(UserContext)
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
    <div className={s.heart} onClick={(e) => onHeartClick(e, pet.id)}
      style={{ backgroundColor: background }}
    >
      <img src={user?.favorites.includes(pet.id.toString()) ?
        favoriteFilled : favorite} />
    </div>
  )
}

export default FavButton