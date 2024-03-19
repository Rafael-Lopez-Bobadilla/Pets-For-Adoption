import { Autocomplete, TextField } from "@mui/material"
import { memo } from "react"
type Props = {
  value: string,
  options: string[],
  onChange: (_e: any, newValue: string | null) => void
}
const AutocompleteMui = memo(({ value, options, onChange }: Props) => {
  return (
    <Autocomplete options={options} blurOnSelect={true}
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