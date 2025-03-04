import React, { useState, useEffect } from "react";
import TableComponent from "../../component/Tables/TableComponent";
import CommonModal from "../../component/Modal/CommonModal";
import GroupingForm from "./GroupingForm";
import GroupingService from "../../service/GroupingService"; // Import the GroupingService
import { useAuth } from "../../context/AuthContext";
import { FaSpinner } from "react-icons/fa"; // Import spinner icon
// import CommonToastMessage from "../../component/notification/CommonToastMessage";

const CreateGrouping = () => {
    const { authContextData } = useAuth();
    const { username, services } = authContextData;
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
            // CommonToastMessage("Failed to fetch groupings.", "error");
        }
    };

    useEffect(() => {
        fetchGroupings();
    }, [username]);

    // Add or Update Grouping
    const handleSubmit = async (groupingData, file) => {
        try {
          const { username } = authContextData; // Get the logged-in user's username
      
          // Add the username to the groupingData object
          const updatedGroupingData = {
            ...groupingData,
            username: username,
          };
      
          if (isUpdate) {
            // Update grouping
            await GroupingService.updateGrouping(selectedGrouping.id, updatedGroupingData, file);
          } else {
            // Add new grouping
            await GroupingService.createGrouping(updatedGroupingData, file);
          }
      
          fetchGroupings(); // Refresh the groupings list
          setShowModal(false); // Close the modal
          // CommonToastMessage(`Grouping ${isUpdate ? "updated" : "created"} successfully.`, "success");
        } catch (error) {
          // CommonToastMessage(`Failed to ${isUpdate ? "update" : "create"} grouping.`, "error");
        }
      };

    // Delete Grouping
    const handleDelete = async (id) => {
        setLoadingStates((prev) => ({ ...prev, [id]: true })); // Set loading state for this item
        try {
            await GroupingService.deleteGrouping(id);
            fetchGroupings(); // Refresh the groupings list
            // CommonToastMessage("Grouping deleted successfully.", "success");
        } catch (error) {
            // CommonToastMessage("Failed to delete grouping.", "error");
        } finally {
            setLoadingStates((prev) => ({ ...prev, [id]: false })); // Reset loading state for this item
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
                const isLoading = loadingStates[id] || false; // Get loading state for this item

                return (
                    <div className="flex space-x-2">
                        <button
                            onClick={() => openModal(row.original)}
                            className="px-3 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(id)}
                            className="px-3 py-1 text-white bg-red-500 rounded-md hover:bg-red-600 disabled:bg-red-300"
                            disabled={isLoading} // Disable button while loading
                        >
                            {isLoading ? (
                                <FaSpinner className="animate-spin" /> // Show spinner
                            ) : (
                                "Delete"
                            )}
                        </button>
                    </div>
                );
            },
        },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl w-full bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
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