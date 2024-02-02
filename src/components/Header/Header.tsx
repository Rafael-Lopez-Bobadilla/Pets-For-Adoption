import s from './Header.module.css'
import logo from '../../assets/svgs/logo.svg'
import Select from '../Select/Select'
import LocationInput from '../LocationInput/LocationInput'
import heart from '../../assets/svgs/heart.svg'
const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.wrapper}>
        <div className={s.controls}>
          <img src={logo} className={s.logo} />
          <Select />
          <LocationInput />
        </div>
        <div className={s.options}>
          <img src={heart} className={s.heart} title='Favorites' />
          <div className={s.line}></div>
          <button className={s.button}>Sign Up</button>
          <button className={s.button}>Sign In</button>
        </div>
      </div>
    </header>
  )
}

export default Header