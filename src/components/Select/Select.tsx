import s from './Select.module.css'
import arrowDown from '../../assets/svgs/arrowDown.svg'
import { useSearchParams } from 'react-router-dom'

type SelectType = {
  options: string[] | null,
  field: string
}
const Select = ({ options, field }: SelectType) => {
  const [params, setParams] = useSearchParams()
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let newParams: URLSearchParams
    if (field === 'type') {
      newParams = new URLSearchParams()
    } else {
      newParams = new URLSearchParams(params)
    }
    newParams.set(field, e.target.value.toLowerCase())
    setParams(newParams)
  }
  return (
    <div className={s.select}>
      {options && <select onChange={handleChange}
        value={params.get(field) ? params.get(field) as string : options[0]}>
        {options?.map(option => <option key={option} value={option.toLowerCase()}>{option}</option>)}
      </select>}
      <img src={arrowDown} />
    </div>
  )
}

export default Select