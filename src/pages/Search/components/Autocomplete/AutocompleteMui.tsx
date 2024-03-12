import { Autocomplete, TextField } from "@mui/material"
import { memo } from "react"
type Props = {
  value: string,
  options: string[],
  onChange: (_e: any, newValue: string | null) => void
}
const AutocompleteMui = memo(({ value, options, onChange }: Props) => {
  console.log('render')
  return (
    <Autocomplete options={options}
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
})

export default AutocompleteMui