import heart from '../../../../assets/svgs/heart.svg'
import s from './FavButton.module.css'
import { UserContext } from '../../../UserProvider/UserProvider'
import { useContext, useState } from 'react'
import { Dialog } from "@mui/material"
import favorite from '../../../../assets/svgs/favorite.svg'
import { useNavigate } from "react-router-dom"
import { DialogSetterContext } from '../../../DialogProvider/DialogProvider'
const FavButton = ({ icon }: { icon: boolean }) => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const { setOpen, setType } = useContext(DialogSetterContext)
  const [dialog, setDialog] = useState('none')
  const handleClick = () => {
    if (!user) setDialog('no-user')
    if (user && user.favorites.length === 0) setDialog('no-fav')
    if (user && user.favorites.length > 0) navigate('/favorites')
  }
  const openAuthDialog = (type: string) => {
    setDialog('none')
    setOpen(true)
    setType(type)
  }
  return (
    <>
      <button className={s.button} onClick={handleClick}>
        {icon && <img src={heart} />}
        Favorites
      </button>
      <Dialog open={dialog === 'no-user' ? true : false} onClose={() => setDialog('none')}>
        <div className={s.noUser}>
          <h3>Join us to select favorite pets!</h3>
          <p><span onClick={() => openAuthDialog('login')}>Log in</span>{' or '}
            <span onClick={() => openAuthDialog('signup')}>Create an account</span></p>
        </div>
      </Dialog>
      <Dialog open={dialog === 'no-fav' ? true : false} onClose={() => setDialog('none')}>
        <div className={s.noFav}>
          <h3>No favorites yet</h3>
          <p>{'When you find a pet you like, add it your favorites list by tapping the '}
            <img src={favorite} />
          </p>
          <button onClick={() => setDialog('none')}>OK</button>
        </div>
      </Dialog>
    </>
  )
}

export default FavButton