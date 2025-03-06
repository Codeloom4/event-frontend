import React, { useState } from "react";
import { Box, Tab, Tabs } from "@material-ui/core";

function CommonTabsComponent({ tabs, defaultValue }) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <Tabs value={value} onChange={handleChange} aria-label="tutorial tabs">
        {tabs.map((tab, index) => (
          <Tab label={tab.label} value={String(index + 1)} key={index} />
        ))}
      </Tabs>
      {tabs.map((tab, index) => (
        <div
          key={index}
          role="tabpanel"
          hidden={value !== String(index + 1)}
          id={`tabpanel-${index + 1}`}
          aria-labelledby={`tab-${index + 1}`}
        >
          {value === String(index + 1) && tab.content}
        </div>
      ))}
    </Box>
  );
}

export default CommonTabsComponent;
