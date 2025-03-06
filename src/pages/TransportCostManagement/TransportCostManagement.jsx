import React, { useState, useEffect } from "react";
import TableComponent from "../../component/Tables/TableComponent";
import CommonModal from "../../component/Modal/CommonModal";
import TransportCostForm from "./TransportCostForm";
import TransportCostService from "../../service/TransportCostService";
import { FaSpinner } from "react-icons/fa";
import { RESPONSE_CODES } from "../../utils/constants";

const TransportCostManagement = () => {
  const [transportCosts, setTransportCosts] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTransportCost, setSelectedTransportCost] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [loadingStates, setLoadingStates] = useState({});

  // Fetch all transport costs
  const fetchTransportCosts = async () => {
    const response = await TransportCostService.getTransportCostsList();
    if (response.data.responseCode === RESPONSE_CODES.SUCCESS) {
      setTransportCosts(response.data.content);
    }
  };

  // Fetch all districts
  const fetchDistricts = async () => {
    try {
      const response = await TransportCostService.getDistrictsList();
      if (response.data.responseCode === RESPONSE_CODES.SUCCESS) {
        setDistricts(response.data.content);
      }
    } catch (error) {
      console.error("Failed to fetch districts:", error);
    }
  };

  useEffect(() => {
    fetchTransportCosts();
    fetchDistricts();
  }, []);

  // Add or Update Transport Cost
  const handleSubmit = async (transportCostData) => {
    try {
      if (isUpdate) {
        await TransportCostService.updateTransportCost(transportCostData);
      } else {
        await TransportCostService.createTransportCost(transportCostData);
      }
      fetchTransportCosts();
      setShowModal(false);
    } catch (error) {
      console.error("Failed to save transport cost:", error);
    }
  };

  // Delete Transport Cost
  const handleDelete = async (id) => {
    setLoadingStates((prev) => ({ ...prev, [id]: true }));
    try {
      await TransportCostService.deleteTransportCost(id);
      fetchTransportCosts();
    } catch (error) {
      console.error("Failed to delete transport cost:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
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
        const isLoading = loadingStates[id] || false;

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
              disabled={isLoading}
            >
              {isLoading ? <FaSpinner className="animate-spin" /> : "Delete"}
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gradient-dark sm:px-6 lg:px-8">
      <div className="w-full p-8 bg-gray-800 rounded-lg shadow-lg max-w-7xl">
        <h1 className="mb-8 text-4xl font-bold text-center text-white">
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
          <TableComponent
            columns={columns}
            data={transportCosts}
            className="w-full"
            headerClassName="bg-gray-700 text-gray-300"
            rowClassName="hover:bg-gray-600 transition-colors duration-200"
            cellClassName="px-6 py-4 text-sm text-gray-300"
          />
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
            districts={districts.filter(
              (district) =>
                !transportCosts.some((cost) => cost.districtId === district.id)
            )}
          />
        </CommonModal>
      </div>
    </div>
  );
};

export default TransportCostManagement;