import s from './HeaderDropMenu.module.css'
import { DialogSetterContext } from '../../../DialogProvider/DialogProvider'
import { useContext } from 'react'
import userIconGray from '../../../../assets/svgs/userIconGray.svg'
import { UserContext } from '../../../UserProvider/UserProvider'
import { logout } from '../logout'
import FavButton from '../FavButton/FavButton'
import { useNavigate } from 'react-router-dom'
const DropMenu = ({ setIsOpen }: { setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { setOpen, setType } = useContext(DialogSetterContext)
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const openAuthDialog = (type: string) => {
    setOpen(true)
    setType(type)
  }
  const onLogout = async () => {
    await logout(setUser)
    setIsOpen(false)
    if (location.pathname === '/favorites') navigate('/search')
  }
  return (
    <div className={s.dropMenu}>
      {user && <button className={s.user}>
        <img src={userIconGray} className={s.userIcon} />
        <span className={s.name}>{user?.name}</span>
      </button>}
      <FavButton icon={false} />
      {!user && <><button onClick={() => openAuthDialog('signup')}>Sign Up</button>
        <button onClick={() => openAuthDialog('login')}>Log In</button></>}
      {user && <button onClick={onLogout}>Log out</button>}
    </div>
  )
}

export default DropMenu