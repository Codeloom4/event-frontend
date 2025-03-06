import React, { useEffect, useState } from "react";
import CommonTextField from "../../../component/Form/CommonTextField";
import { Box, Grid, MenuItem } from "@mui/material";
import CommonSelect from "../../../component/Form/CommonSelect";
import PackageManagementService from "../../../service/PackageManagementService";
import CommonButton from "../../../component/Form/CommonButton";
import { displayApiMessage } from "../../../context/ToastContext";
import { useAuth } from "../../../context/AuthContext";

const BasicInformation = ({ setValue }) => {
  const { authContextData } = useAuth();
  const userName = authContextData?.username;
  const [packageDetails, setPackageDetails] = useState({
    id: "",
    name: "",
    description: "",
    eventType: "",
    type: "",
  });

  const [eventList, setEventList] = useState([]);
  const [error, setError] = useState("");
  const [packageTypeList, setPackageTypeList] = useState([]);

  useEffect(() => {
    retrieveDropDowns();
  }, []);

  const retrieveDropDowns = async () => {
    try {
      const response = await PackageManagementService.access();
      if (response.data.responseCode === "00") {
        setEventList(response.data.content?.eventList || []);
        setPackageTypeList(response.data.content?.packageTypeBeanList || []);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  const formOnChange = (e) => {
    const { name, value, type } = e.target;
    setPackageDetails((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const onClickAdd = async () => {
    try {
      const requestData = {
        ...packageDetails,
        createdUser: userName,
      };
      console.log("requestData:", requestData);
      const response = await PackageManagementService.createPackage(
        requestData
      );
      console.log("response:", response.data);

      const { responseMsg, responseCode } = response.data;

      if (responseCode === "00") {
        displayApiMessage(responseMsg);
        setValue("2");
      } else {
        displayApiMessage(responseMsg, "warning");
      }
    } catch (err) {
      setError("Package creation failed. Please try again.");
      console.error("Error:", err);
    }
  };

  const onClickReset = () => {
    setPackageDetails({
      id: "",
      name: "",
      description: "",
      eventType: "",
      type: "",
    });
  };

  return (
    <div>
      <Box p={3}>
        {/* First Row - Event Name & Description */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <CommonTextField
              id="id"
              name="id"
              label="Event ID"
              value={packageDetails.id || ""}
              onChange={formOnChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CommonTextField
              id="name"
              name="name"
              label="Package Name"
              value={packageDetails.name || ""}
              onChange={formOnChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CommonTextField
              id="description"
              name="description"
              label="Description"
              value={packageDetails.description || ""}
              onChange={formOnChange}
              required
              fullWidth
            />
          </Grid>
        </Grid>

        {/* Second Row - Event Type & Package Type */}
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12} md={6}>
            <CommonSelect
              id="eventType"
              name="eventType"
              value={packageDetails.eventType || ""}
              onChange={formOnChange}
              label="Event Type"
              required
              fullWidth
            >
              {(eventList || []).map((type) => (
                <MenuItem key={type.eventType} value={type.eventType}>
                  {type.description}
                </MenuItem>
              ))}
            </CommonSelect>
          </Grid>
          <Grid item xs={12} md={6}>
            <CommonSelect
              id="type"
              name="type"
              value={packageDetails.type || ""}
              onChange={formOnChange}
              label="Package Type"
              required
              fullWidth
            >
              {(packageTypeList || []).map((type) => (
                <MenuItem key={type.code} value={type.code}>
                  {type.description}
                </MenuItem>
              ))}
            </CommonSelect>
          </Grid>
        </Grid>
      </Box>

      {error && (
        <p className="text-red-500 text-sm text-center mb-4">{error}</p>
      )}
      <div className="w-full flex flex-row gap-4">
        <CommonButton
          type="reject"
          label="Reset"
          onClick={onClickReset}
          className="w-50"
        />
        <CommonButton
          type="button"
          label="Create Package"
          onClick={onClickAdd}
          className="w-50"
        />
      </div>
    </div>
  );
};

export default BasicInformation;
