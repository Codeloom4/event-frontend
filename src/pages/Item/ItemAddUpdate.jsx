import React, { useState, useEffect } from "react";
import { FormControlLabel, Radio } from "@mui/material";
import CommonTextField from "../../component/Form/CommonTextField";
import CommonRadioGroup from "../../component/Form/CommonRadioGroup";
import ItemService from "../../service/ItemService";
import CommonButton from "../../component/Form/CommonButton";
import { displayApiMessage } from "../../context/ToastContext";

const ItemAddUpdate = ({ isUpdate, data, close, completed }) => {
  const [itemManagement, setItemManagement] = useState({
    itemName: data?.itemName || "",
    isRefundable: data?.isRefundable || "",
    minOrderQty: data?.minOrderQty || "",
  });

  const [DropdownItemDetails, setDropdownItemDetails] = useState([]);

  useEffect(() => {
    onReset();
    getDropdownItemDetails();
  }, []);

  const getDropdownItemDetails = async () => {
    try {
      const result = await ItemService.access();
      setDropdownItemDetails(result?.data?.content);
    } catch (error) {
      console.error("Failed to fetch dropdown details:", error);
    }
  };

  const onReset = () => {
    setItemManagement({
      id: isUpdate ? data?.id : "",
      itemName: isUpdate ? data?.itemName : "",
      isRefundable: isUpdate ? data?.isRefundable : "",
      minOrderQty: isUpdate ? data?.minOrderQty : "",
    });
  };

  const onClickAddUpdate = (itemManagement) => {
    if (!isUpdate) {
      saveHandler(itemManagement);
    } else {
      updateHandler(itemManagement);
    }
  };

  const saveHandler = async (itemManagement) => {
    try {
      const result = await ItemService.add(itemManagement);
      displayApiMessage(result.data.responseMsg);
      if (result.data.responseCode === "00") {
        onReset();
        close();
        completed();
      }
    } catch (error) {
      displayApiMessage("Failed to save item. Please try again.", "error");
    }
  };

  const updateHandler = async (itemManagement) => {
    try {
      const result = await ItemService.edit(itemManagement);
      displayApiMessage(result.data.responseMsg);
      if (result.data.responseCode === "00") {
        onReset();
        close();
        completed();
      } 
    } catch (error) {
      displayApiMessage("Failed to update item. Please try again.", "error");
    }
  };

  const formOnChange = (e) => {
    const { name, value, type } = e.target;
    setItemManagement((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  return (
    <div className="p-6">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CommonTextField
            id="itemName"
            name="itemName"
            label="Item Name"
            value={itemManagement?.itemName}
            onChange={formOnChange}
            required
          />
          <CommonRadioGroup
            name="isRefundable"
            label="Is Refundable?"
            value={itemManagement.isRefundable || ""}
            onChange={formOnChange}
            row
            required
          >
            <FormControlLabel
              value="true"
              control={<Radio />}
              label="Yes"
              className="text text-gray-500"
            />
            <FormControlLabel
              value="false"
              control={<Radio />}
              label="No"
              className="text text-gray-500"
            />
          </CommonRadioGroup>
          <CommonTextField
            id="minOrderQty"
            name="minOrderQty"
            label="Minimum Order Quantity"
            type="number"
            value={itemManagement.minOrderQty}
            onChange={formOnChange}
            required
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={close}
            className="px-6 py-2 text-white transition duration-200 bg-gray-500 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <CommonButton
            type={isUpdate ? "Update" : "Add"}
            label={isUpdate ? "Update" : "Add"}
            onClick={() => onClickAddUpdate(itemManagement)}
          />
        </div>
      </form>
    </div>
  );
};

export default ItemAddUpdate;