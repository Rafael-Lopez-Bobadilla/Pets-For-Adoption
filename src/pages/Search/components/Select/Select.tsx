import { useSearchParams } from "react-router-dom";
import {
  Select as SelectMui,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
type SelectProps = {
  options: string[];
  field: string;
};
const Select = ({ options, field }: SelectProps) => {
  const [params, setParams] = useSearchParams();

  const handleChange = (e: SelectChangeEvent) => {
    let newParams: URLSearchParams;
    if (field === "type") {
      newParams = new URLSearchParams();
    } else {
      newParams = new URLSearchParams(params);
    }
    if (e.target.value === "Any") newParams.delete(field);
    if (e.target.value !== "Any") newParams.set(field, e.target.value);
    newParams.set("page", "1");
    setParams(newParams);
  };
  const value = options.find(
    (option) => option.toLowerCase() == params.get(field)?.toLowerCase()
  );
  return (
    <>
      <SelectMui
        onChange={handleChange}
        name={field}
        fullWidth
        sx={{
          backgroundColor: "white",
          borderRadius: "var(--input-radius)",
          "& .MuiSelect-select": {
            padding: "var(--input-padding)",
          },
        }}
        value={value ? value : options[0]}
      >
        {options.map((option) => (
          <MenuItem value={option} key={option}>
            {option}
          </MenuItem>
        ))}
      </SelectMui>
    </>
  );
};

export default Select;
