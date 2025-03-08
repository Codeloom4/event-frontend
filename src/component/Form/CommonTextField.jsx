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
  className = "", 
  labelColor = "white",  
  borderColor = "#d1d5db",  
  textColor = "white",
  autofillBgColor = "#1f2937" // Default autofill background color
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
      autoComplete="on" // Enable autofill
      InputProps={{
        className: `rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 ${className}`,
        style: { 
          backgroundColor: "transparent", 
          color: textColor,
        },
      }}
      InputLabelProps={{
        style: { color: labelColor },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "transparent",
          "& fieldset": { borderColor: borderColor },
          "&:hover fieldset": { borderColor: borderColor },
          "&.Mui-focused fieldset": { borderColor: borderColor },
        },
        "& input:-webkit-autofill": {
          WebkitBoxShadow: `0 0 0px 1000px ${autofillBgColor} inset !important`, // Customizable autofill bg
          WebkitTextFillColor: `${textColor} !important`, // Keep text color
          transition: "background-color 5000s ease-in-out 0s !important",
        },
      }}
    />
  );
};

export default CommonTextField;
