import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tabs, Tab, Box } from "@mui/material";
import BasicInformation from "./tabs/BasicInformation";
import ItemSelect from "./tabs/ItemSelect";
import { FaSpinner } from "react-icons/fa"; // Import spinner icon

const Package = () => {
  const { packageId } = useParams();
  const [value, setValue] = useState("1"); // The value to control which tab is active
  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  // Simulate fetching package details
  const fetchPackageDetails = async () => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demonstration, using hardcoded data
      setPackageDetails({
        name: "Premium Package",
        description: "This is a premium package with amazing features.",
        pricing: "500 USD",
      });
    } catch (error) {
      console.error("Failed to fetch package details:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchPackageDetails();
  }, [packageId]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center  bg-gradient-dark">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (!packageDetails) {
    return <div>No package details found.</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center  bg-gradient-dark  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full  bg-gray-800   p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Package Management
        </h1>

        {/* Tabs Section */}
        <Box sx={{ width: "100%", typography: "body1" }}>
  <Tabs
    value={value}
    onChange={handleTabChange}
    aria-label="package tabs"
    sx={{ '& .MuiTab-root': { color: 'white' } }} // Apply white color to tabs
  >
    <Tab label="Basic Details" value="1" sx={{ color: "white" }} />
    <Tab label="Item" value="2" sx={{ color: "white" }} />
    <Tab label="Upload Images" value="3" sx={{ color: "white" }} />
  </Tabs>

  {/* Tab Panels */}
  <div role="tabpanel" hidden={value !== "1"}>
    {value === "1" && (
      <Box p={3}>
        <BasicInformation setValue={setValue} />
      </Box>
    )}
  </div>

  <div role="tabpanel" hidden={value !== "2"}>
    {value === "2" && (
      <Box p={3}>
        <ItemSelect setValue={setValue} />
      </Box>
    )}
  </div>

  <div role="tabpanel" hidden={value !== "3"}>
    {value === "3" && (
      <Box p={3}>
        <p className="text-gray-700">Pricing: {packageDetails.pricing}</p>
      </Box>
    )}
  </div>
</Box>

      </div>
    </div>
  );
};

export default Package;