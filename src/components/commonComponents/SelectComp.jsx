import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { forwardRef, useId } from "react";

const SelectComp = forwardRef(function SelectComp(
  { options, label, sx, ...props },
  ref
) {
  const id = useId();
  return (
    <FormControl fullWidth variant="outlined" sx={sx}>
      {label && <InputLabel id={id}> {label}</InputLabel>}
      <Select labelId={id} label={label} ref={ref} {...props}>
        {options?.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});

export default SelectComp