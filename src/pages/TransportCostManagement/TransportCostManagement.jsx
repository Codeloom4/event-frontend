import React, { useState, useEffect } from "react";
import TableComponent from "../../component/Tables/TableComponent";
import CommonModal from "../../component/Modal/CommonModal";
import TransportCostForm from "./TransportCostForm";
import TransportCostService from "../../service/TransportCostService"; // Import the service
import { FaSpinner } from "react-icons/fa"; // Import spinner icon

const TransportCostManagement = () => {
  const [transportCosts, setTransportCosts] = useState([]);
  const [districts, setDistricts] = useState([]); // Store district list
  const [showModal, setShowModal] = useState(false);
  const [selectedTransportCost, setSelectedTransportCost] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [loadingStates, setLoadingStates] = useState({}); // Track loading state for each item

  // Fetch all transport costs
  const fetchTransportCosts = async () => {
    try {
      const response = await TransportCostService.getTransportCostsList();
      if (response.data.responseCode === "00") {
        setTransportCosts(response.data.content);
      }
    } catch (error) {
      console.error("Failed to fetch transport costs:", error);
    }
  };

  // Fetch all districts
  const fetchDistricts = async () => {
    try {
      const response = await TransportCostService.getDistrictsList();
      if (response.data.responseCode === "00") {
        setDistricts(response.data.content);
      }
    } catch (error) {
      console.error("Failed to fetch districts:", error);
    }
  };

  useEffect(() => {
    fetchTransportCosts();
    fetchDistricts(); // Fetch districts on page load
  }, []);

  // Add or Update Transport Cost
  const handleSubmit = async (transportCostData) => {
    try {
      if (isUpdate) {
        // Update transport cost
        await TransportCostService.updateTransportCost(transportCostData);
      } else {
        // Add new transport cost
        await TransportCostService.createTransportCost(transportCostData);
      }
      fetchTransportCosts(); // Refresh the transport cost list
      setShowModal(false); // Close the modal
    } catch (error) {
      console.error("Failed to save transport cost:", error);
    }
  };

  // Delete Transport Cost
  const handleDelete = async (id) => {
    setLoadingStates((prev) => ({ ...prev, [id]: true })); // Set loading state for this item
    try {
      await TransportCostService.deleteTransportCost(id);
      fetchTransportCosts(); // Refresh the transport cost list
    } catch (error) {
      console.error("Failed to delete transport cost:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false })); // Reset loading state for this item
    }
  };

  // Open modal for adding or updating a transport cost
  const openModal = (transportCost = null) => {
    setSelectedTransportCost(transportCost);
    setIsUpdate(!!transportCost);
    setShowModal(true);
  };

  // Table columns
  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "District", accessor: "districtName" },
    { Header: "Delivery Fee", accessor: "deliveryFee" },
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
          Transport Cost Management
        </h1>

        {/* Add New Transport Cost Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => openModal()}
            className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
          >
            Add New Transport Cost
          </button>
        </div>

        {/* Transport Cost Table */}
        <div className="overflow-x-auto">
          <TableComponent columns={columns} data={transportCosts} />
        </div>

        {/* Add/Update Transport Cost Modal */}
        <CommonModal
          showModal={showModal}
          handleClose={() => setShowModal(false)}
          title={isUpdate ? "Update Transport Cost" : "Add Transport Cost"}
        >
          <TransportCostForm
            onSubmit={handleSubmit}
            initialData={selectedTransportCost}
            isUpdate={isUpdate}
            districts={districts} // Pass districts to the form
          />
        </CommonModal>
      </div>
    </div>
  );
};

export default TransportCostManagement;