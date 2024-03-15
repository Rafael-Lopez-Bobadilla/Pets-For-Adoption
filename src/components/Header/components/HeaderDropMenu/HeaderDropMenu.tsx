import s from './HeaderDropMenu.module.css'
import { DialogSetterContext } from '../../../DialogProvider/DialogProvider'
import { useContext } from 'react'
const DropMenu = () => {
  const { setOpen, setType } = useContext(DialogSetterContext)
  const openAuthDialog = (type: string) => {
    setOpen(true)
    setType(type)
  }
  return (
    <div className={s.dropMenu}>
      <button>Favorites</button>
      <button onClick={() => openAuthDialog('signup')}>Sign Up</button>
      <button onClick={() => openAuthDialog('login')}>Log In</button>
    </div>
  )
}

export default DropMenu