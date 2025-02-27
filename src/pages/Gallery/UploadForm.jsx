import CommonTextField from "../../component/Form/CommonTextField";
import CommonSelect from "../../component/Form/CommonSelect";
import React, { useState, useEffect, useCallback } from "react";
import PublicService from "../../service/PublicService"; // Import PublicService
import { FaSpinner } from "react-icons/fa"; // Import spinner for loading state
import { MenuItem } from "@mui/material"; // Import MenuItem from MUI

const UploadForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    eventType: "",
    groupName: "",
    images: [],
  });

  const [eventTypes, setEventTypes] = useState([]); // State to store event types
  const [loading, setLoading] = useState(true); // Loading state for fetching event types
  const [uploading, setUploading] = useState(false); // Loading state for upload button

  // Log eventTypes whenever it changes
  useEffect(() => {
    console.log("Event Types State Updated:", eventTypes);
  }, [eventTypes]);

  // Fetch event types when the component mounts
  const fetchEventTypes = useCallback(async () => {
    setLoading(true); // Show spinner
    try {
      const response = await PublicService.getServices(); // Fetch event types
      console.log("Event Types Response:", response); // Debugging: Log the API response
      if (response.data.responseCode === "00") {
        setEventTypes(response.data.content); // Set the event types
      }
    } catch (error) {
      console.error("Failed to fetch event types:", error);
    } finally {
      setLoading(false); // Hide spinner after data is fetched
    }
  }, []); // Empty dependency array ensures this function is memoized

  useEffect(() => {
    fetchEventTypes();
  }, [fetchEventTypes]); // Add fetchEventTypes as a dependency

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Selected Value:", value); // Debugging: Log the selected value
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true); // Show spinner on upload button
    try {
      await onSubmit(formData); // Call the onSubmit function passed from the parent
    } catch (error) {
      console.error("Failed to upload images:", error);
    } finally {
      setUploading(false); // Hide spinner after upload is complete
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Event Type Dropdown */}
      <div>
      
        {loading ? (
          <div className="flex justify-center">
            <FaSpinner className="animate-spin text-2xl" />
            <span className="ml-2">Loading event types...</span>
          </div>
        ) : (
          <CommonSelect
            id="eventType"
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            label="Event Type"
            required
          >
            {eventTypes.map((type) => (
              <MenuItem key={type.eventType} value={type.eventType}>
                {type.description}
              </MenuItem>
            ))}
          </CommonSelect>
        )}
      </div>

      {/* Group Name Input */}
      <CommonTextField
        id="groupName"
        name="groupName"
        label="Group Name"
        value={formData.groupName}
        onChange={handleChange}
        required
      />

      {/* File Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Upload Images</label>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 flex items-center justify-center"
        disabled={uploading || loading} // Disable button while uploading or loading
      >
        {uploading ? (
          <FaSpinner className="animate-spin mr-2" />
        ) : null}
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
};

export default UploadForm;