import React, { useEffect, useState } from "react";
import EventsService from "../../service/EventsService";
import CommonTextField from "../../component/Form/CommonTextField";

const AddUpdateEvent = ({ data, isAdd, onClose }) => {
  const [formData, setFormData] = useState({
    id: "",
    eventType: "",
    description: "",
  });

  useEffect(() => {
    if (isAdd) {
      setFormData({
        id: "",
        eventType: "",
        description: "",
      });
    } else {
      setFormData({
        id: data.id,
        eventType: data.eventType,
        description: data.description,
      });
    }
  }, [data, isAdd]);

  const handleSave = async () => {
    if (isAdd) {
      const response = await EventsService.createEvent({
        eventType: formData.eventType,
        description: formData.description,
      });
      if (response.data.responseCode === "00") {
        console.log("Event created successfully");
        onClose();
      }
    } else {
      const response = await EventsService.updateEvent(formData);
      if (response.data.responseCode === "00") {
        console.log("Event updated successfully");
        onClose();
      }
    }
  };

  const formOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {!isAdd && (
            <CommonTextField
              id="id"
              name="id"
              label="ID"
              disabled={true}
              value={formData.id}
              onChange={formOnChange}
            />
          )}
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
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2 text-white transition duration-200 bg-blue-500 rounded-md hover:bg-blue-600"
          >
            {isAdd ? "Add" : "Update"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 text-white transition duration-200 bg-gray-500 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUpdateEvent;
