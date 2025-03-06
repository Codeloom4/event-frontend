import React, { useState, useEffect } from "react";
import TableComponent from "../../component/Tables/TableComponent";
import CommonModal from "../../component/Modal/CommonModal";
import GroupingForm from "./GroupingForm";
import GroupingService from "../../service/GroupingService"; // Import the GroupingService
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext"; // Import toast context
import { FaSpinner } from "react-icons/fa"; // Import spinner icon

const CreateGrouping = () => {
  const { authContextData } = useAuth();
  const { username, services } = authContextData;
  const { displayApiMessage } = useToast(); // Use toast hook
  const [groupings, setGroupings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedGrouping, setSelectedGrouping] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [loadingStates, setLoadingStates] = useState({}); // Track loading state for each item

  // Fetch all groupings for the logged-in user
  const fetchGroupings = async () => {
    try {
      const response = await GroupingService.getGroupingsByUsername(username);
      setGroupings(response.data);
    } catch (error) {
      displayApiMessage("Failed to fetch groupings.", "error"); // Use toast message
    }
  };

  useEffect(() => {
    fetchGroupings();
  }, [username]);

  // Add or Update Grouping
  const handleSubmit = async (groupingData, file) => {
    try {
      const updatedGroupingData = { ...groupingData, username };

      if (isUpdate) {
        await GroupingService.updateGrouping(selectedGrouping.id, updatedGroupingData, file);
        displayApiMessage("Grouping updated successfully.", "success");
      } else {
        await GroupingService.createGrouping(updatedGroupingData, file);
        displayApiMessage("Grouping created successfully.", "success");
      }

      fetchGroupings();
      setShowModal(false);
    } catch (error) {
      displayApiMessage(`Failed to ${isUpdate ? "update" : "create"} grouping.`, "error");
    }
  };

  // Delete Grouping
  const handleDelete = async (id) => {
    setLoadingStates((prev) => ({ ...prev, [id]: true }));
    try {
      await GroupingService.deleteGrouping(id);
      displayApiMessage("Grouping deleted successfully.", "success");
      fetchGroupings();
    } catch (error) {
      displayApiMessage("Failed to delete grouping.", "error");
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
    }
  };

  // Process Grouping (Generate and Download PDF)
  const handleProcess = async (id) => {
    try {
      // Send GET request to the backend API
      console.error("33333333333");
      const response = await GroupingService.processGrouping(id);

      // Create a URL for the PDF blob
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a temporary <a> element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `participants_grouped_${id}.pdf`); // Set the filename for the downloaded file
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Clean up
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
     
       
      
              // Show error toast message
    if (error.response) {
        console.error("22222222222");
        // If the backend returns an error response
        const errorMessage = error.response.data.responseMsg || "Failed to process grouping.";
        console.error(errorMessage, error);
        displayApiMessage(errorMessage, "error");
    }else{
        console.error("1111111111");
        console.error("Failed to process and download PDF:", error);
        displayApiMessage("Failed to download PDF. Please try again.", "error");

    }



    }
  };

  // Open modal for adding or updating a grouping
  const openModal = (grouping = null) => {
    setSelectedGrouping(grouping);
    setIsUpdate(!!grouping);
    setShowModal(true);
  };

  // Table columns
  const columns = [
    { Header: "Event Type", accessor: "eventType" },
    { Header: "Event Name", accessor: "eventName" },
    { Header: "Total Participants", accessor: "totalParticipants" },
    { Header: "Number of Groups", accessor: "numberOfGroups" },
    { Header: "Grouping Method", accessor: "groupingMethod" },
    { Header: "Created At", accessor: "createdAt" },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => {
        const id = row.original.id;
        const isLoading = loadingStates[id] || false;

        return (
          <div className="flex space-x-2">
            {/* Edit Button */}
            <button
              onClick={() => openModal(row.original)}
              className="px-3 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Edit
            </button>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(id)}
              className="px-3 py-1 text-white bg-red-500 rounded-md hover:bg-red-600 disabled:bg-red-300"
              disabled={isLoading}
            >
              {isLoading ? <FaSpinner className="animate-spin" /> : "Delete"}
            </button>

            {/* Process Button */}
            <button
              onClick={() => handleProcess(id)} // Add this function
              className="px-3 py-1 text-white bg-green-500 rounded-md hover:bg-green-600"
            >
              Process
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Participant Grouping
        </h1>

        {/* Add New Grouping Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => openModal()}
            className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
          >
            Add New Grouping
          </button>
        </div>

        {/* Grouping Table */}
        <div className="overflow-x-auto">
          <TableComponent columns={columns} data={groupings} />
        </div>

        {/* Add/Update Grouping Modal */}
        <CommonModal
          showModal={showModal}
          handleClose={() => setShowModal(false)}
          title={isUpdate ? "Update Grouping" : "Add Grouping"}
        >
          <GroupingForm
            onSubmit={handleSubmit}
            initialData={selectedGrouping}
            isUpdate={isUpdate}
            services={services}
          />
        </CommonModal>
      </div>
    </div>
  );
};

export default CreateGrouping;