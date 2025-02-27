import React from "react";
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";

const CommonSelect = ({ 
  name,  
  value, 
  onChange, 
  label = "Select an option", 
  children, 
  error = "", 
  className = "" 
}) => {
  return (
    <FormControl fullWidth variant="outlined" error={!!error} className={className}>
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        value={value}
        onChange={onChange}
        label={label}
        sx={{
          borderRadius: "6px",
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#d1d5db" },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#9ca3af" },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#4b5563" },
        }}
      >
        {children} {/* Parent provides <MenuItem> options */}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default CommonSelect;
