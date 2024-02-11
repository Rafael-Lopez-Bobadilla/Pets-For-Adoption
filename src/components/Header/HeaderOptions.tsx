import s from './HeaderOptions.module.css'
import heart from '../../assets/svgs/heart.svg'

const HeaderOptions = () => {
  return (
    <div className={s.options}>
      <button className={s.favorites}>
        <img src={heart} />
        <span>Favorites</span>
      </button>
      <div className={s.line}></div>
      <button>Sign Up</button>
      <button>Log In</button>
    </div>
  )
}

export default HeaderOptions