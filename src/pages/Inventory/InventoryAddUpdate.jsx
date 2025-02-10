import React, { useState } from "react";

const InventoryAddUpdate = ({ isUpdate, data, close, completed }) => {
  const [formData, setFormData] = useState({
    code: data?.code || "",
    itemName: data?.itemName || "",
    refundable: data?.refundable || "No",
    unitPrice: data?.unitPrice || "",
    cityPurchase: data?.cityPurchase || "",
    salesPrice: data?.salesPrice || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    completed(formData);
    close();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {isUpdate ? "Update Inventory" : "Add Inventory"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="block">
            <span className="text-gray-700">Code:</span>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Item Name:</span>
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Refundable:</span>
            <select
              name="refundable"
              value={formData.refundable}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </label>

          <label className="block">
            <span className="text-gray-700">Unit Price (USD):</span>
            <input
              type="number"
              name="unitPrice"
              step="0.01"
              value={formData.unitPrice}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">City Purchase:</span>
            <input
              type="text"
              name="cityPurchase"
              value={formData.cityPurchase}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Sales Price (USD):</span>
            <input
              type="number"
              name="salesPrice"
              step="0.01"
              value={formData.salesPrice}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={close}
            className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            {isUpdate ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InventoryAddUpdate;