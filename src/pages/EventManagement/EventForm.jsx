import React, { useState } from "react";
import CommonTextField from "../../component/Form/CommonTextField";

const EventForm = ({ onSubmit, initialData, isUpdate }) => {
  const [formData, setFormData] = useState(
    initialData || { eventType: "", description: "" }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!isUpdate && (
        <CommonTextField
          id="eventType"
          name="eventType"
          label="Event Type"
          value={formData.eventType}
          onChange={handleChange}
          required
        />
      )}
      <CommonTextField
        id="description"
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          {isUpdate ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default EventForm;