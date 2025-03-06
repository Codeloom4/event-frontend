import { Box } from "@mui/material";
import React, { useState } from "react";
import UpdatableTableComponent from "../../../component/Tables/UpdatableTableComponent";

const ItemSelect = ({ setValue }) => {
  const [events, setEvents] = useState([]);

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
    <div>
      <h1>Select Items</h1>
      <p>Please select the items you want to include in your package.</p>
      {/* Add your item selection logic here */}

      <Box p={3}>
        <UpdatableTableComponent
          columns={columns}
          data={events}
          updateAction={handleUpdate}
          editableColumns={["Event Type", "Description"]}
        />
      </Box>
    </div>
  );
};

export default ItemSelect;
