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
      totalParticipants: "",
      numberOfGroups: "",
      groupingMethod: "",
      file: null,
    }
  );

  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [errors, setErrors] = useState({}); // Store validation errors

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Ensure only positive integers are allowed for number fields
    if ((name === "totalParticipants" || name === "numberOfGroups") && (!/^\d*$/.test(value) || value < 0)) {
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.eventType) newErrors.eventType = "Event type is required.";
    if (!formData.eventName) newErrors.eventName = "Event name is required.";
    if (!formData.totalParticipants) newErrors.totalParticipants = "Total participants is required.";
    if (formData.numberOfGroups && parseInt(formData.numberOfGroups, 10) > parseInt(formData.totalParticipants, 10)) {
      newErrors.numberOfGroups = "Number of groups cannot exceed total participants.";
    }

    // File upload is required only when creating a new grouping
    if (!isUpdate && !formData.file) {
      newErrors.file = "File upload is required when creating a new grouping.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Prevent submission if validation fails

    setIsLoading(true);
    try {
      await onSubmit(formData, formData.file);
    } finally {
      setIsLoading(false);
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
      {errors.eventType && <p className="text-red-500 text-sm">{errors.eventType}</p>}

      <CommonTextField id="eventName" name="eventName" value={formData.eventName} onChange={handleChange} label="Event Name" required />
      {errors.eventName && <p className="text-red-500 text-sm">{errors.eventName}</p>}

      <CommonTextField
        id="totalParticipants"
        name="totalParticipants"
        type="number"
        value={formData.totalParticipants}
        onChange={handleChange}
        label="Total Participants"
        required
      />
      {errors.totalParticipants && <p className="text-red-500 text-sm">{errors.totalParticipants}</p>}

      <CommonTextField
        id="numberOfGroups"
        name="numberOfGroups"
        type="number"
        value={formData.numberOfGroups}
        onChange={handleChange}
        label="Number of Groups (Optional)"
      />
      {errors.numberOfGroups && <p className="text-red-500 text-sm">{errors.numberOfGroups}</p>}

      <CommonSelect id="groupingMethod" name="groupingMethod" value={formData.groupingMethod} onChange={handleChange} label="Grouping Method" required>
        <MenuItem value="Random">Random</MenuItem>
        <MenuItem value="By Age Range">By Age Range</MenuItem>
        <MenuItem value="By Family">By Family</MenuItem>
        <MenuItem value="By Job Role">By Job Role</MenuItem>
      </CommonSelect>

      <div>
        <label htmlFor="upload-file" className="block text-sm font-medium text-gray-700">
          Upload Participant List (CSV) {isUpdate ? "(Optional)" : "(Required)"}
        </label>
        <input id="upload-file" type="file" onChange={handleFileChange} className="w-full p-2 border rounded-md" />
        {errors.file && <p className="text-red-500 text-sm">{errors.file}</p>}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-blue-300 flex items-center"
          disabled={isLoading}
        >
          {isLoading ? <FaSpinner className="animate-spin mr-2" /> : null}
          {isUpdate ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default GroupingForm;
