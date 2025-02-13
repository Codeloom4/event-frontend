import React from "react";
import { TextField, MenuItem } from "@mui/material";

const CommonSelect = ({ 
  name,  // Added name prop
  value, 
  onChange, 
  label = "Select an option", 
  children, // Allows passing options from parent
  error = "", 
  className = "" 
}) => {
  return (
    <TextField
      select
      name={name} // Added name here
      label={label}
      value={value}
      onChange={onChange}
      fullWidth
      variant="outlined"
      error={!!error}
      helperText={error ? error : ""}
      className={className}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "6px",
          "& fieldset": { borderColor: "#d1d5db" }, // Light gray border
          "&:hover fieldset": { borderColor: "#9ca3af" }, // Darker gray on hover
          "&.Mui-focused fieldset": { borderColor: "#4b5563" }, // Soft black on focus
          "& select": { paddingTop: "10px", paddingBottom: "10px" }, // Fix text cut-off issue
        },
      }}
    >
      {children} {/* Parent provides <MenuItem> options */}
    </TextField>
  );
};

export default CommonSelect;
