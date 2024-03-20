import heart from '../../../../assets/svgs/heart.svg'
import s from './FavButton.module.css'
import { UserContext } from '../../../UserProvider/UserProvider'
import { useContext, useState } from 'react'
import { Dialog } from "@mui/material"
import favorite from '../../../../assets/svgs/favorite.svg'
import { useNavigate } from "react-router-dom"
import NoUserDialog from '../../../NoUserDialog/NoUserDialog'
const FavButton = ({ icon }: { icon: boolean }) => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const [dialog, setDialog] = useState(false)
  const [openNoUser, setOpenNoUser] = useState(false)
  const handleClick = () => {
    if (!user) setOpenNoUser(true)
    if (user && user.favorites.length === 0) setDialog(true)
    if (user && user.favorites.length > 0) navigate('/favorites')
  }
  return (
    <>
      <button className={s.button} onClick={handleClick}>
        {icon && <img src={heart} />}
        Favorites
      </button>
      <NoUserDialog openDialog={openNoUser} setOpenDialog={setOpenNoUser} />
      <Dialog open={dialog} onClose={() => setDialog(false)}>
        <div className={s.noFav}>
          <h3>No favorites yet</h3>
          <p>{'When you find a pet you like, add it your favorites list by tapping the '}
            <img src={favorite} />
          </p>
          <button onClick={() => setDialog(false)}>OK</button>
        </div>
      </Dialog>
    </>
  )
}

export default FavButton