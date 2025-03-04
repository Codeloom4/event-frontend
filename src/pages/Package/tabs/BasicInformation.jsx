import React from "react";
import CommonTextField from "../../../component/Form/CommonTextField";
import { Box } from "@mui/material";

const BasicInformation = () => {
  return (
    <div>
      <Box p={3} className="space-y-4">
        <CommonTextField
          id="eventType"
          name="eventType"
          label="Event Type"
        //   value={packageDetails.name}
          // onChange={handleChange}
          required
        />

        <CommonTextField
          id="eventType"
          name="eventType"
          label="Event Type"
        //   value={packageDetails.description}
          // onChange={handleChange}
          required
        />
      </Box>
    </div>
  );
};

export default BasicInformation;
