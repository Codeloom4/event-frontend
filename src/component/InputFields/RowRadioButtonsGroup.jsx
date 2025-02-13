import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const RowRadioButtonsGroup = ({ label, options, selectedValue, onChange }) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <RadioGroup
        row
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RowRadioButtonsGroup;
