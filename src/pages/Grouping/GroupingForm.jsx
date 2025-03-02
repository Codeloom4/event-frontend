import React, { useState } from "react";
import CommonTextField from "../../component/Form/CommonTextField";
import CommonSelect from "../../component/Form/CommonSelect";
import { useAuth } from "../../context/AuthContext"; 
import { MenuItem } from "@mui/material"; 
import { FaSpinner } from "react-icons/fa"; // Import spinner icon

const GroupingForm = ({ onSubmit, initialData, isUpdate }) => {
  const { services } = useAuth();
  const [formData, setFormData] = useState(
    initialData || {
      eventType: "",
      eventName: "",
      totalParticipants: 0,
      numberOfGroups: null,
      groupingMethod: "",
      file: null,
    }
  );

  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    try {
      await onSubmit(formData, formData.file);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CommonSelect id="eventType" name="eventType" value={formData.eventType} onChange={handleChange} label="Event Type" required>
        {services.length > 0 &&
          services.map((service) => (
            <MenuItem key={service.eventType} value={service.eventType}>
              {service.description}
            </MenuItem>
          ))}
      </CommonSelect>

      <CommonTextField id="eventName" name="eventName" value={formData.eventName} onChange={handleChange} label="Event Name" required />
      <CommonTextField id="totalParticipants" name="totalParticipants" type="number" value={formData.totalParticipants} onChange={handleChange} label="Total Participants" required />
      <CommonTextField id="numberOfGroups" name="numberOfGroups" type="number" value={formData.numberOfGroups} onChange={handleChange} label="Number of Groups (Optional)" />

      <CommonSelect id="groupingMethod" name="groupingMethod" value={formData.groupingMethod} onChange={handleChange} label="Grouping Method" required>
        <MenuItem value="Random">Random</MenuItem>
        <MenuItem value="By Age Range">By Age Range</MenuItem>
        <MenuItem value="By Family">By Family</MenuItem>
        <MenuItem value="By Job Role">By Job Role</MenuItem>
      </CommonSelect>

      <div>
        <label htmlFor="upload-file" className="block text-sm font-medium text-gray-700">
          Upload Participant List (CSV)
        </label>
        <input id="upload-file" type="file" onChange={handleFileChange} className="w-full p-2 border rounded-md" />
      </div>

      <div className="flex justify-end">
        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-blue-300 flex items-center" disabled={isLoading}>
          {isLoading ? <FaSpinner className="animate-spin mr-2" /> : null}
          {isUpdate ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default GroupingForm;
