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
      <InputLabel 
        sx={{ 
          color: "white", 
          "&.Mui-focused": { color: "white" } // Keeps label white on focus
        }}
      >
        {label}
      </InputLabel>
      <Select
        name={name}
        value={value}
        onChange={onChange}
        label={label}
        sx={{
          color: "white", // Selected text color
          backgroundColor: "transparent", // Transparent background
          borderRadius: "6px",
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#d1d5db" }, // Default border color
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#9ca3af" }, // Hover border
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#4b5563" }, // Prevents default blue border
          "& .MuiSelect-icon": { color: "white" }, // Dropdown arrow color
          "& .MuiSelect-select": { 
            color: "white", // Selected text color
            backgroundColor: "transparent !important", // Ensures no blue focus background
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: "rgba(0, 0, 0)", // Dark transparent dropdown
              color: "white", // Dropdown text color
            },
          },
        }}
      >
        {children}
      </Select>
      {error && <FormHelperText sx={{ color: "red" }}>{error}</FormHelperText>}
    </FormControl>
  );
};

export default CommonSelect;
