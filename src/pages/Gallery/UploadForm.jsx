import CommonTextField from "../../component/Form/CommonTextField";
import CommonSelect from "../../component/Form/CommonSelect";
import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa"; 
import { MenuItem } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { RESPONSE_CODES } from "../../utils/constants";
import { displayApiMessage } from "../../context/ToastContext";
import GalleryService from "../../service/GalleryService";

const UploadForm = ({ onClickBack, onCompleted }) => {
  const [formData, setFormData] = useState({
    eventType: "",
    groupName: "",
    images: [],
  });
  const { services } = useAuth(); 
  const [uploading, setUploading] = useState(false);

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    const response = await GalleryService.uploadImages(
      formData.eventType,
      formData.groupName,
      formData.images
    );
    if (response.data.responseCode === RESPONSE_CODES.SUCCESS) {
      onClickBack();
      onCompleted();
    }
    displayApiMessage(response.data.responseMsg);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Event Type Dropdown */}
      <div>
          <CommonSelect
            id="eventType"
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            label="Event Type"
            required
          >
            {services.length > 0 && services.map((type) => (
              <MenuItem key={type.eventType} value={type.eventType}>
                {type.description}
              </MenuItem>
            ))}
          </CommonSelect>
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
        <label
          htmlFor="upload-images"
          className="block text-sm font-medium text-gray-700"
        >
          Upload Images
        </label>
        <input
          id="upload-images"
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
        className="flex items-center justify-center px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        disabled={uploading}
      >
        {uploading ? <FaSpinner className="mr-2 animate-spin" /> : null}
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
};

export default UploadForm;