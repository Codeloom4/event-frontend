import React, { useState, useEffect } from "react";
import TableComponent from "../../component/Tables/TableComponent";
import CommonModal from "../../component/Modal/CommonModal";
import EventForm from "./EventForm";
import ApiManager from "../../service/Api/ApiManager";
import { useAuth } from "../../context/AuthContext";
import { FaSpinner } from "react-icons/fa"; // Import spinner icon

const CreateEvent = () => {
  const { authContextData } = useAuth();
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [loadingStates, setLoadingStates] = useState({}); // Track loading state for each item

  // Fetch all events
  const fetchEvents = async () => {
    try {
      const response = await ApiManager.apiGet("/ems/events");
      if (response.data.responseCode === "00") {
        setEvents(response.data.content);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Add or Update Event
  const handleSubmit = async (eventData) => {
    try {
      if (isUpdate) {
        // Update event
        await ApiManager.apiPut(`/ems/events/${eventData.eventType}`, {
          description: eventData.description,
        });
      } else {
        // Add new event
        await ApiManager.apiPost("/ems/events", eventData);
      }
      fetchEvents(); // Refresh the event list
      setShowModal(false); // Close the modal
    } catch (error) {
      console.error("Failed to save event:", error);
    }
  };

  // Delete Event
  const handleDelete = async (eventType) => {
    setLoadingStates((prev) => ({ ...prev, [eventType]: true })); // Set loading state for this item
    try {
      await ApiManager.apiDelete(`/ems/events/${eventType}`);
      fetchEvents(); // Refresh the event list
    } catch (error) {
      console.error("Failed to delete event:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [eventType]: false })); // Reset loading state for this item
    }
  };

  // Open modal for adding or updating an event
  const openModal = (event = null) => {
    setSelectedEvent(event);
    setIsUpdate(!!event);
    setShowModal(true);
  };

  // Table columns
  const columns = [
    { Header: "Event Type", accessor: "eventType" },
    { Header: "Description", accessor: "description" },
    { Header: "Created At", accessor: "createdAt" },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => {
        const eventType = row.original.eventType;
        const isLoading = loadingStates[eventType] || false; // Get loading state for this item

        return (
          <div className="flex space-x-2">
            <button
              onClick={() => openModal(row.original)}
              className="px-3 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(eventType)}
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Event Management
        </h1>

        {/* Add New Event Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => openModal()}
            className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
          >
            Add New Event
          </button>
        </div>

        {/* Event Table */}
        <div className="overflow-x-auto">
          <TableComponent columns={columns} data={events} />
        </div>

        {/* Add/Update Event Modal */}
        <CommonModal
          showModal={showModal}
          handleClose={() => setShowModal(false)}
          title={isUpdate ? "Update Event" : "Add Event"}
        >
          <EventForm
            onSubmit={handleSubmit}
            initialData={selectedEvent}
            isUpdate={isUpdate}
          />
        </CommonModal>
      </div>
    </div>
  );
};

export default CreateEvent;