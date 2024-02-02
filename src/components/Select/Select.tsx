import s from './Select.module.css'
import arrow_down from '../../assets/svgs/arrow_down.svg'
const Select = () => {
  return (
    <div className={s.select}>
      <span>Dog</span>
      <img src={arrow_down} className={s.img} />
    </div>
  )
}

export default Select