import s from './HeaderOptions.module.css'
import heart from '../../../../assets/svgs/heart.svg'
import { DialogSetterContext } from '../../../DialogProvider/DialogProvider'
import { useContext } from 'react'
const HeaderOptions = () => {
  const { setOpen, setType } = useContext(DialogSetterContext)
  const openAuthDialog = (type: string) => {
    setOpen(true)
    setType(type)
  }
  return (
    <div className={s.options}>
      <button className={s.favorites}>
        <img src={heart} />
        <span>Favorites</span>
      </button>
      <div className={s.line}></div>
      <button onClick={() => openAuthDialog('signup')}>Sign Up</button>
      <button onClick={() => openAuthDialog('login')}>Log In</button>
    </div>
  )
}

export default HeaderOptions