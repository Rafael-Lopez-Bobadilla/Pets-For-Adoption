import { useSearchParams } from 'react-router-dom'
import { Select as SelectMui, MenuItem, SelectChangeEvent } from '@mui/material'
import s from './Select.module.css'
import { capitalizeWords } from '../utils/capitalize'
type SelectType = {
  options: string[],
  field: string
}
const Select = ({ options, field }: SelectType) => {
  const [params, setParams] = useSearchParams()

  const handleChange = (e: SelectChangeEvent) => {
    let newParams: URLSearchParams
    if (field === 'type') {
      newParams = new URLSearchParams()
    } else {
      newParams = new URLSearchParams(params)
    }
    newParams.set(field, e.target.value)
    setParams(newParams)
  }

  return (
    <SelectMui onChange={handleChange} className={s.select}
      value={params.get(field) ? capitalizeWords(params.get(field) as string) : options[0]}>
      {options.map(option => <MenuItem value={option} key={option}>{option}</MenuItem>)}
    </SelectMui>
  )
}

export default Select