import s from './HeaderOptions.module.css'
import heart from '../../../../assets/svgs/heart.svg'
import { DialogSetterContext } from '../../../DialogProvider/DialogProvider'
import { useContext, useState } from 'react'
import { UserContext } from '../../../UserProvider/UserProvider'
import userIcon from '../../../../assets/svgs/userIcon.svg'
import triangleDown from '../../../../assets/svgs/triangleDown.svg'
const HeaderOptions = () => {
  const { setOpen, setType } = useContext(DialogSetterContext)
  const { user, setUser } = useContext(UserContext)
  const [openLogout, setOpenLogout] = useState(false)
  const openAuthDialog = (type: string) => {
    setOpen(true)
    setType(type)
  }
  const logout = async () => {
    const res = await fetch('http://localhost:5002/api/v1/logout', { credentials: 'include' })
    if (res.status === 200) setUser(null)
    const data = await res.json()
    console.log(data)
    setOpenLogout(false)
  }
  return (
    <div className={s.options}>
      <button className={s.favorites}>
        <img src={heart} className={s.icon} />
        <span>Favorites</span>
      </button>
      <div className={s.line}></div>
      {!user && <>
        <button onClick={() => openAuthDialog('signup')}>Sign Up</button>
        <button onClick={() => openAuthDialog('login')}>Log In</button>
      </>
      }
      {user && <div className={s.user}>
        <button onClick={() => setOpenLogout(!openLogout)} onBlur={() => setOpenLogout(false)}>
          <img src={userIcon} className={s.userIcon} />
          <span className={s.name}>{user?.name}</span>
          <img src={triangleDown} className={s.tri} />
        </button>
        {openLogout && <div onClick={logout} onMouseDown={e => e.preventDefault()}>Log out</div>}
      </div>}
    </div>
  )
}

export default HeaderOptions