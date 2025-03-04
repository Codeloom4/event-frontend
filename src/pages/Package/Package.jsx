import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tabs, Tab, Box } from "@mui/material";
import UpdatableTableComponent from "../../component/Tables/UpdatableTableComponent";
import CommonTextField from "../../component/Form/CommonTextField";

const Package = () => {
  const { packageId } = useParams();
  const [value, setValue] = useState("1"); // The value to control which tab is active
  const [events, setEvents] = useState([]);
  const [packageDetails, setPackageDetails] = useState(null);

  // Simulate fetching package details (Uncomment to fetch from API)
  const fetchPackageDetails = async () => {
    // For demonstration, using hardcoded data
    setPackageDetails({
      name: "Premium Package",
      description: "This is a premium package with amazing features.",
      pricing: "500 USD",
    });

    // Simulate fetching events data
    const mockEvents = [
      {
        eventType: "Type A",
        description: "Description A",
        createdAt: "2023-01-01",
      },
      {
        eventType: "Type B",
        description: "Description B",
        createdAt: "2023-01-02",
      },
      {
        eventType: "Type C",
        description: "Description C",
        createdAt: "2023-01-03",
      },
    ];
    setEvents(mockEvents); // Populate the events state with mock data
  };

  useEffect(() => {
    fetchPackageDetails();
  }, [packageId]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!packageDetails) {
    return <div>Loading...</div>;
  }

  // Table columns
  const columns = [
    { Header: "Event Type", accessor: "eventType" },
    { Header: "Description", accessor: "description" },
    { Header: "Created At", accessor: "createdAt" },
  ];

  const handleUpdate = (updatedRow) => {
    setEvents((prev) =>
      prev.map((row) =>
        row.eventType === updatedRow.eventType ? updatedRow : row
      )
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Package Management
        </h1>

        {/* Tabs Section */}
        <Box sx={{ width: "100%", typography: "body1" }}>
          <Tabs
            value={value}
            onChange={handleTabChange}
            aria-label="package tabs"
          >
            <Tab label="Basic Details" value="1" />
            <Tab label="Item" value="2" />
            <Tab label="Upload Images" value="3" />
          </Tabs>

          <div role="tabpanel" hidden={value !== "1"}>
            {value === "1" && (
              <Box p={3} className="space-y-4">
                <CommonTextField
                  id="eventType"
                  name="eventType"
                  label="Event Type"
                  value={packageDetails.name}
                  // onChange={handleChange}
                  required
                />

                <CommonTextField
                  id="eventType"
                  name="eventType"
                  label="Event Type"
                  value={packageDetails.description}
                  // onChange={handleChange}
                  required
                />
              </Box>
            )}
          </div>

          <div role="tabpanel" hidden={value !== "2"}>
            {value === "2" && (
              <Box p={3}>
                <UpdatableTableComponent
                  columns={columns}
                  data={events}
                  updateAction={handleUpdate}
                  editableColumns={["Event Type", "Description"]}
                />
              </Box>
            )}
          </div>

          <div role="tabpanel" hidden={value !== "3"}>
            {value === "3" && (
              <Box p={3}>
                <p>Pricing: {packageDetails.pricing}</p>
              </Box>
            )}
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Package;
