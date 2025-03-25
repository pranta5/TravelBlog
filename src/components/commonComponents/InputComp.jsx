import { TextField } from "@mui/material";
import { forwardRef, useId } from "react";

const InputComp = forwardRef(function InputComp(
  { label, type = "text",name, sx, ...props },
  ref
) {
  const id = useId();
  return (
    <TextField
      fullWidth
      type={type}
      label={label}
      id={id}
      name={name}
      inputRef={ref}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
          backgroundColor: "white",
          "&:hover": {
            backgroundColor: "grey.50",
          },
        },
        ...sx, // Merge custom styles passed via `sx`
      }}
      {...props}
    />
  );
});
export default InputComp;
