import { Autocomplete as AutocompleteMui } from "@mui/material"
import { TextField } from "@mui/material"
import { useSearchParams } from "react-router-dom"
type AutocompleteProps = {
  options: string[],
  field: string,
  closeOverlay?: () => void
}
const Autocomplete = ({ options, field, closeOverlay }: AutocompleteProps) => {
  const [params, setParams] = useSearchParams()
  const onChange = (_e: any, newValue: string | null) => {
    let newParams = new URLSearchParams(params)
    if (newValue === 'Any') newParams.delete(field)
    if (newValue !== 'Any' && newValue) newParams.set(field, newValue)
    setParams(newParams)
    if (closeOverlay !== undefined) closeOverlay()
  }
  console.log(location.search)
  const value = options.find(option =>
    option.toLowerCase() == params.get(field)?.toLowerCase())
  return (
    <AutocompleteMui options={options}
      value={value ? value : options[0]}
      onChange={onChange}
      renderInput={params => <TextField {...params} />}
      disableClearable
      sx={{
        backgroundColor: 'white',
        borderRadius: 'var(--input-radius)',
        '& .MuiAutocomplete-inputRoot': {
          padding: 'var(--input-padding)',
          borderRadius: 'var(--input-radius)',
          '& .MuiAutocomplete-input': {
            padding: '0'
          }
        }
      }} />
  )
}

export default Autocomplete