import s from './HeaderDropMenu.module.css'
const DropMenu = () => {
  return (
    <div className={s.dropMenu}>
      <button>Favorites</button>
      <button>Sign Up</button>
      <button>Log In</button>
    </div>
  )
}

export default DropMenu