import React, { useState } from "react";
import CommonTextField from "../../component/Form/CommonTextField";
import CommonSelect from "../../component/Form/CommonSelect";

const TransportCostForm = ({ onSubmit, initialData, isUpdate, districts }) => {
  const [formData, setFormData] = useState(
    initialData || { districtId: "", deliveryFee: "" }
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
      {/* District Dropdown */}
      <CommonSelect
        id="districtId"
        name="districtId"
        label="District"
        value={formData.districtId}
        onChange={handleChange}
        required
      >
        <option value="">Select District</option>
        {districts.map((district) => (
          <option key={district.id} value={district.id}>
            {district.districtName}
          </option>
        ))}
      </CommonSelect>

      {/* Delivery Fee */}
      <CommonTextField
        id="deliveryFee"
        name="deliveryFee"
        label="Delivery Fee"
        type="number"
        value={formData.deliveryFee}
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

export default TransportCostForm;