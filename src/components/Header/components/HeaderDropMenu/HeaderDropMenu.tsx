import s from './HeaderDropMenu.module.css'
import { DialogSetterContext } from '../../../DialogProvider/DialogProvider'
import { useContext } from 'react'
import userIconGray from '../../../../assets/svgs/userIconGray.svg'
import { UserContext } from '../../../UserProvider/UserProvider'
import { logout } from '../logout'
const DropMenu = ({ setIsOpen }: { setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { setOpen, setType } = useContext(DialogSetterContext)
  const { user, setUser } = useContext(UserContext)
  const openAuthDialog = (type: string) => {
    setOpen(true)
    setType(type)
  }
  const onLogout = async () => {
    await logout(setUser)
    setIsOpen(false)
  }
  return (
    <div className={s.dropMenu}>
      {user && <button className={s.user}>
        <img src={userIconGray} className={s.userIcon} />
        <span className={s.name}>{user?.name}</span>
      </button>}
      <button className={s.button}>Favorites</button>
      {!user && <><button onClick={() => openAuthDialog('signup')} className={s.button}>Sign Up</button>
        <button onClick={() => openAuthDialog('login')} className={s.button}>Log In</button></>}
      {user && <button onClick={onLogout} className={s.button}>Log out</button>}
    </div>
  )
}

export default DropMenu