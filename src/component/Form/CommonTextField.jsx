import React from "react";
import { TextField } from "@mui/material";

const CommonTextField = ({ 
  id, 
  name, // Added name prop
  label, 
  type = "text", 
  value, 
  defaultValue, 
  onChange, 
  helperText, 
  className = "" 
}) => {
  return (
    <TextField
      id={id}
      name={name} // Passing name prop
      label={label}
      type={type}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      helperText={helperText}
      variant="outlined"
      fullWidth
      InputProps={{
        className: `bg-white text-gray-800 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 ${className}`,
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "#d1d5db" },
          "&:hover fieldset": { borderColor: "#9ca3af" },
          "&.Mui-focused fieldset": { borderColor: "#4b5563" },
        },
      }}
    />
  );
};

export default CommonTextField;
