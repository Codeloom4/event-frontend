import React from "react";
import { Button } from "@mui/material";

// Define colors for different button types
const buttonColors = {
  search: { bg: "primary", disabled: "primary.light" },
  add: { bg: "success", disabled: "success.light" },
  update: { bg: "warning", disabled: "warning.light" },
  delete: { bg: "error", disabled: "error.light" },
  confirm: { bg: "secondary", disabled: "secondary.light" },
  reject: { bg: "grey", disabled: "grey.500" },
};

const CommonButton = ({ 
  type = "add", 
  label, 
  onClick, 
  size = "medium", 
  disabled = false, 
  className = "" 
}) => {
  const color = buttonColors[type] || buttonColors.add; 

  return (
    <Button
      variant="contained"
      color={disabled ? "inherit" : color.bg} // Use MUI color system
      disabled={disabled}
      onClick={onClick}
      className={`rounded-md shadow-md transition-all duration-200 ${className}`}
      size={size} // Supports 'small', 'medium', 'large'
    >
      {label}
    </Button>
  );
};

export default CommonButton;
