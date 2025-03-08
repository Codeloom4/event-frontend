import { Box, Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import UpdatableTableComponent from "../../../component/Tables/TableComponent";
import { FaSpinner } from "react-icons/fa"; // Import spinner icon

const ItemSelect = ({ setValue }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  // Simulate fetching events data
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data
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
        setEvents(mockEvents);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchEvents();
  }, []);

  const handleUpdate = (updatedRow) => {
    setEvents((prev) =>
      prev.map((row) =>
        row.eventType === updatedRow.eventType ? updatedRow : row
      )
    );
  };

  // Table columns
  const columns = [
    { Header: "Event Type", accessor: "eventType" },
    { Header: "Description", accessor: "description" },
    { Header: "Created At", accessor: "createdAt" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <Typography variant="h4" className="text-white font-bold mb-4">
          Select Items
        </Typography>
        <Typography variant="body1" className="text-white mb-6">
          Please select the items you want to include in your package.
        </Typography>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <FaSpinner className="animate-spin text-4xl text-blue-500" />
          </div>
        ) : (
          <Box>
            <UpdatableTableComponent
              columns={columns}
              data={events}
              updateAction={handleUpdate}
              editableColumns={["Event Type", "Description"]}
            />
          </Box>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-end mt-6 space-x-4">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setValue("1")} // Navigate to the previous tab
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setValue("3")} // Navigate to the next tab
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ItemSelect;