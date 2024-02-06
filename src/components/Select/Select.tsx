import s from './Select.module.css'
import arrowDown from '../../assets/svgs/arrowDown.svg'
const Select = ({ options }: { options: string[] | null }) => {
  return (
    <div className={s.select}>
      <select>
        {options?.map(option => <option key={option} value={option}>{option}</option>)}
      </select>
      <img src={arrowDown} />
    </div>
  )
}

export default Select