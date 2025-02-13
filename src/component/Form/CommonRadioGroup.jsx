import React from "react";
import { RadioGroup, FormControl, FormLabel } from "@mui/material";

const CommonRadioGroup = ({ 
  name, // Added name prop
  label, 
  value, 
  onChange, 
  children, // Allow passing radio buttons outside
  row = false, 
  error = "", 
  className = "" 
}) => {
  return (
    <FormControl error={!!error} className={className}>
      <FormLabel sx={{ fontWeight: "bold", color: "#9ca9af" }}>{label}</FormLabel>
      <RadioGroup 
        name={name} // Pass name prop here
        value={value} 
        onChange={onChange} 
        row={row}
      >
        {children} {/* Custom radio buttons will be passed from parent */}
      </RadioGroup>
    </FormControl>
  );
};

export default CommonRadioGroup;
