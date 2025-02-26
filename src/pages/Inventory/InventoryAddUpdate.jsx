import React, { useState, useEffect } from "react";
import produce from "immer";
import { MenuItem } from "@mui/material";
import { FormControlLabel, Radio } from "@mui/material";
import CommonTextField from "../../component/Form/CommonTextField"; // Adjust the import path
import CommonSelect from "../../component/Form/CommonSelect"; // Adjust the import path
import CommonRadioGroup from "../../component/Form/CommonRadioGroup"; // Adjust the import path
import InventoryService from "../../service/InventoryService"; // Adjust the import path
import CommonButton from "../../component/Form/CommonButton"; // Adjust the import path

const InventoryAddUpdate = ({ isUpdate, data, close, completed }) => {
  const userRoleTypeList = [
    { value: "admin", label: "Admin" },
    { value: "editor", label: "Editor" },
    { value: "viewer", label: "Viewer" },
  ];
  const [selectedRole, setSelectedRole] = useState("");

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

  const [inventoryManagement, setInventoryManagement] = useState({});

  const [inventoryManagementErrors, setInventoryManagementErrors] = useState(
    {} // State to hold validation errors
  );
  const [DropdownItemDetails, setDropdownItemDetails] = useState([]);

  //initial step
  useEffect(() => {
    onReset();
    getDropdownItemDetails();
    // getBankName()
    // if (
    //   statusList.length === 0 ||
    //   userRoleTypeList.length === 0 ||
    //   bankBranchList.length === 0
    // ) {
    //   dispatch(getUserManagementRequest())
    // }
    // if (isUpdate && data) {
    //   setUserManagement(data)
    // }
  }, []);

  const getDropdownItemDetails = async () => {
    try {
      const result = await InventoryService.access();
      setDropdownItemDetails(result?.data?.content);
      console.log("getDropdownItemDetails result : ", result);
    } catch (e) {
      console.log("setDropdownItemDetails Error : ", e);
    }
  };

  const onReset = () => {
    setInventoryManagement({
      id: isUpdate ? data?.id : "",
      itemName: isUpdate ? data?.itemName : "",
      isRefundable: isUpdate ? data?.isRefundable : "",
      description: isUpdate ? data?.description : "",
      purchasePrice: isUpdate ? data?.purchasePrice : "",
      salesPrice: isUpdate ? data?.salesPrice : "",
      orderQuantity: isUpdate ? data?.orderQuantity : "",
      salesQuantity: isUpdate ? data?.salesQuantity : "",
      balanceQuantity: isUpdate ? data?.balanceQuantity : "",
      createdUser: isUpdate ? data?.createdUser : "",
      itemId: isUpdate ? data?.itemId : "",
    });
    setInventoryManagementErrors({});
  };

  const onClickAddUpdate = (inventoryManagement) => {
    // const foundErrors = findError()
    // if (Object.keys(foundErrors).length > 0) {
    //   showToast(
    //     ALERT_WARNING,
    //     validationError,
    //     TOAST_POSITION_TOP_RIGHT,
    //     5,
    //     TOAST_TRANSITION_SLIDE
    //   )
    //   setUserManagementErrors(foundErrors)
    // } else {
    //   //ToDo: Api Call method and retrive data again method
    if (!isUpdate) {
      saveHandler(inventoryManagement);
    } else {
      updateHandler(inventoryManagement);
    }
    // }
  };

  const saveHandler = async (inventoryManagement) => {
    const result = await InventoryService.add(inventoryManagement);
    // handleNotification(result, result.data.responseMsg)
    if (result.data.responseCode !== "01") {
      onReset();
      close();
    }
    completed()
  };
  const updateHandler = async (inventoryManagement) => {
    const result = await InventoryService.edit(inventoryManagement)
    // handleNotification(result, result.data.responseMsg)
    if (result.data.responseCode !== '01') {
      onReset()
      close()
    }
    completed()
  };

  //   const formOnChange = (e) => {
  //     const { name, value } = e.target;

  //     setInventoryManagement((Item) =>
  //         produce(Item, (draft) => {
  //             draft[name ] = value;
  //         })
  //     );
  // };

  const formOnChange = (e) => {
    const { name, value, type } = e.target;
    setInventoryManagement((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  console.log("inventoryManagement  ------->>>>> ", inventoryManagement);
  console.log("DropdownItemDetails  ------->>>>> ", DropdownItemDetails);

  return (
    <div className="p-6">
      {/* <h2 className="mb-6 text-2xl font-semibold text-gray-800">
        {isUpdate ? "Update Inventory" : "Add Inventory"}
      </h2> */}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* <div className="max-w-lg p-4 mx-auto space-y-4 bg-white rounded-lg shadow-md"> */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* ID Field */}
          {/* <CommonTextField 
        id="id" 
        name="id" 
        label="ID" 
        value={inventoryManagement?.id} 
        onChange={formOnChange} 
      /> */}
          {/* Is Refundable - Radio Group */}
          {/* Item Name - Select Dropdown */}
          
          <select
            name="id"
            value={inventoryManagement?.itemId || ""}
            onChange={(e) => {
              const newValue = produce(inventoryManagement, (draft) => {
                draft.itemId = e.target.value;
                var i = e.target.selectedIndex
                draft.itemName = e.target[i].text
              });
              setInventoryManagement(newValue);
            }}
            className="w-full px-3 py-2 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {/* Placeholder option */}
            <option value="" disabled selected={!inventoryManagement?.itemId}>
              Select an item
            </option>

            {/* Dropdown items */}
            {DropdownItemDetails.length > 0 &&
              DropdownItemDetails.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.itemName}
                </option>
              ))}
          </select>


          {/* Item Name - Select Dropdown */}
          {/* <CommonSelect
  name="itemName"
  label="Item Name"
  value={DropdownItemDetails.length > 0 ?inventoryManagement?.itemId : ""}
  onChange={(e) => {
    const selectedItem = DropdownItemDetails.find(item => item.id === e.target.value);
    const newValue = produce(inventoryManagement, (draft) => {
      draft.itemId = e.target.value;
      draft.itemName = selectedItem ? selectedItem.itemName : ''; // You can assign the text directly
      console.log("e.target: selectedItem ", selectedItem);
    });
    setInventoryManagement(newValue);
  }}
>
  {DropdownItemDetails.length > 0 ? (
    DropdownItemDetails.map((item) => (
      <MenuItem key={item.id} value={item.id}>
        {item.itemName}
      </MenuItem>
    ))
  ) : (
    <MenuItem disabled>No items available</MenuItem>
  )}
</CommonSelect> */}

          {/* <CommonSelect
  name="id"
  label="Item Name"
  value={inventoryManagement?.itemId || ""}
  onChange={formOnChange}
>
<option disabled selected value={''}>
                    Select User Role
                  </option>
                  {DropdownItemDetails.length > 0 &&
                    DropdownItemDetails.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.id}
                      </option>
                    ))}

</CommonSelect> */}

          <CommonRadioGroup
            name="isRefundable"
            label="Is Refundable?"
            // value={inventoryManagement.isRefundable.toString()}
            onChange={formOnChange}
            row
          >
            <FormControlLabel
              value="true"
              control={<Radio />}
              label="Yes"
              className="text-gray-500 text"
            />
            <FormControlLabel
              value="false"
              control={<Radio />}
              label="No"
              className="text-gray-500 text"
            />
          </CommonRadioGroup>

          {/* Description */}
          <CommonTextField
            id="description"
            name="description"
            label="Description"
            value={inventoryManagement?.description}
            onChange={formOnChange}
          />

          {/* Purchase Price */}
          <CommonTextField
            id="purchasePrice"
            name="purchasePrice"
            label="Purchase Price"
            type="number"
            value={inventoryManagement?.purchasePrice}
            onChange={formOnChange}
          />

          {/* Sales Price */}
          <CommonTextField
            id="salesPrice"
            name="salesPrice"
            label="Sales Price"
            type="number"
            value={inventoryManagement?.salesPrice}
            onChange={formOnChange}
          />

          {/* Order Quantity */}
          <CommonTextField
            id="orderQuantity"
            name="orderQuantity"
            label="Order Quantity"
            type="number"
            value={inventoryManagement?.orderQuantity}
            onChange={formOnChange}
          />

          {/* Sales Quantity */}
          <CommonTextField
            id="salesQuantity"
            name="salesQuantity"
            label="Sales Quantity"
            type="number"
            value={inventoryManagement?.salesQuantity}
            onChange={formOnChange}
          />

          {/* Balance Quantity */}
          <CommonTextField
            id="balanceQuantity"
            name="balanceQuantity"
            label="Balance Quantity"
            type="number"
            value={inventoryManagement?.balanceQuantity}
            onChange={formOnChange}
          />

          {/* Created User */}
          <CommonTextField
            id="createdUser"
            name="createdUser"
            label="Created User"
            value={inventoryManagement?.createdUser}
            onChange={formOnChange}
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
            // className="px-6 py-2 text-white transition duration-200 bg-blue-500 rounded-md hover:bg-blue-600"
            label={isUpdate ? "Update" : "Add"}
            onClick={() => onClickAddUpdate(inventoryManagement)}
          />
          {/* {isUpdate ? "Update" : "Add"}
          </button> */}
          {/* <CommonButton
          type="add"
          label="Add"
          onClick={() => alert("Add Clicked")}
        />
        <CommonButton
          type="update"
          label="Update"
          onClick={() => alert("Update Clicked")}
        /> */}
        </div>
        {/* </div> */}
      </form>
    </div>
  );
};

export default InventoryAddUpdate;
