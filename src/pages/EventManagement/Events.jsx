import React, { useEffect, useState, useMemo } from "react";
import EventsService from "../../service/EventsService";
import CommonTextField from "../../component/Form/CommonTextField";
import CommonButton from "../../component/Form/CommonButton";
import TableComponent from "../../component/Tables/TableComponent";
import CommonModal from "../../component/Modal/CommonModal";
import AddUpdateEvent from "./AddUpdateEvent";

const Events = () => {
  const [eventsData, setEventsData] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    eventType: "",
    description: "",
  });

  const [showAddUpdateModal, setShowAddUpdateModal] = useState({
    show: false,
    isAdd: false,
    data: {},
  });

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Event Type",
        accessor: "eventType",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              onClick={() => handleEdit(row.original)}
              className="px-3 py-1 text-white transition duration-200 bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(row.original.id)}
              className="px-3 py-1 text-white transition duration-200 bg-red-500 rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    const response = await EventsService.getEventsList();
    setEventsData(response.data);
  };

  const onClickAdd = () => {
    setShowAddUpdateModal({
      show: true,
      isAdd: true,
      data: {},
    });
  };

  const onCloseModal = () => {
    setShowAddUpdateModal({
      show: false,
      isAdd: false,
      data: {},
    });
    retrieveData();
  }

  const handleEdit = (data) => {
    setShowAddUpdateModal({
      show: true,
      isAdd: false,
      data: data,
    });
  };

  const handleDelete = async (id) => {
    const response = await EventsService.deleteEvent(id);
    if (response.data.responseCode === "00") {
      console.log("Event deleted successfully");
      retrieveData();
    } else {
      console.log("Error deleting event");
    }
  };

  const handleFilter = (filter) => {
    console.log("Filter", filter);
  };

  const formOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen p-6 App bg-gray-50">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Event Management
      </h1>
      <div className="flex flex-row-reverse">
        <button
          onClick={onClickAdd}
          className="px-4 py-2 mb-6 text-white transition duration-200 bg-green-500 rounded-md hover:bg-green-600"
        >
          Add New Event
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CommonTextField
          id="eventType"
          name="eventType"
          label="Event Type"
          value={formData.eventType}
          onChange={formOnChange}
        />
        <CommonTextField
          id="description"
          name="description"
          label="Description"
          value={formData.description}
          onChange={formOnChange}
        />
      </div>
      <div className="mt-4">
        <CommonButton
          type="search"
          label="Search"
          onClick={() => alert("Search Clicked")}
        />
      </div>
      {/* Table Component */}
      <TableComponent
        columns={columns}
        data={eventsData}
        loading={false}
        onFilter={handleFilter}
        totalCount={eventsData.length}
        pageCount={Math.ceil(eventsData.length / 5)}
      />
      {/* Add Update Modal */}
      <CommonModal
        showModal={showAddUpdateModal.show}
        size="xl"
        handleClose={onCloseModal}
        title={showAddUpdateModal.isUpdate ? "Update Inventory" : "Add Inventory"}
      >
        <AddUpdateEvent
          data={showAddUpdateModal.data}
          isAdd={showAddUpdateModal.isAdd}
          onClose={onCloseModal}
        />
      </CommonModal>
    </div>
  );
};

export default Events;
