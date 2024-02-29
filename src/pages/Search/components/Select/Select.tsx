import { useSearchParams } from 'react-router-dom'
import { Select as SelectMui, MenuItem, SelectChangeEvent } from '@mui/material'
type SelectProps = {
  options: string[],
  field: string
}
const Select = ({ options, field }: SelectProps) => {
  const [params, setParams] = useSearchParams()

  const handleChange = (e: SelectChangeEvent) => {
    let newParams: URLSearchParams
    if (field === 'type') {
      newParams = new URLSearchParams()
    } else {
      newParams = new URLSearchParams(params)
    }
    if (e.target.value === 'Any') newParams.delete(field)
    if (e.target.value !== 'Any') newParams.set(field, e.target.value)
    setParams(newParams)
  }

  return (
    <>
      <SelectMui onChange={handleChange} fullWidth sx={{
        backgroundColor: 'white',
        textAlign: 'left',
        borderRadius: 'var(--input-radius)',
        '& .MuiSelect-select': {
          padding: 'var(--input-padding)'
        }
      }}
        value={params.get(field) ? params.get(field) as string : options[0]}>
        {options.map(option => <MenuItem value={option} key={option}>{option}</MenuItem>)}
      </SelectMui>
    </>
  )
}

export default Select