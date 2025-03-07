import React from "react";
import { TextField } from "@mui/material";

const CommonTextField = ({ 
  id, 
  name, 
  label, 
  type = "text", 
  disabled = false,
  value, 
  defaultValue, 
  onChange, 
  helperText, 
  className = "" 
}) => {
  return (
    <TextField
      id={id}
      name={name}
      label={label}
      type={type}
      disabled={disabled}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      helperText={helperText}
      variant="outlined"
      fullWidth
      InputProps={{
        className: `text-gray-800 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 ${className}`,
        style: { backgroundColor: "transparent" }, // Removes field background
      }}
      InputLabelProps={{
        style: { color: "white" }, // Label color white
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "transparent", // Removes background color
          "& fieldset": { borderColor: "#d1d5db" },
          "&:hover fieldset": { borderColor: "#9ca3af" },
          "&.Mui-focused fieldset": { borderColor: "#4b5563" },
        },
        "& .MuiInputLabel-root": {
          color: "white !important", // Label remains white
        },
      }}
    />
  );
};

export default CommonTextField;
