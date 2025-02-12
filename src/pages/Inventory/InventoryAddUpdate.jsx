import React, { useState, useEffect } from "react";
import produce from "immer";
import { MenuItem } from "@mui/material";
import { FormControlLabel, Radio } from "@mui/material";
import CommonTextField from "../../component/Form/CommonTextField"; // Adjust the import path
import CommonSelect from "../../component/Form/CommonSelect"; // Adjust the import path
import CommonRadioGroup from "../../component/Form/CommonRadioGroup"; // Adjust the import path


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
  )

  //initial step
  useEffect(() => {
    onReset()
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
  }, [])

  const onReset = () => {
    setInventoryManagement({
    id: isUpdate ? data?.id : '',
    itemName: isUpdate ? data?.itemName : '',
    isRefundable: isUpdate ? data?.isRefundable : '',
    description: isUpdate ? data?.description : '',
    purchasePrice: isUpdate ? data?.purchasePrice : '',
    salesPrice :isUpdate ? data?.salesPrice : '',
    orderQuantity : isUpdate ? data?.orderQuantity : '',
    salesQuantity : isUpdate ? data?.salesQuantity : '',
    balanceQuantity : isUpdate ? data?.balanceQuantity : '',
    createdUser : isUpdate ? data?.createdUser : '',
    itemId:isUpdate ? data?.itemId : '',
    } )
    setInventoryManagementErrors({})
  }

  const onClickAddUpdate = (userManagementt) => {
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
    //   if (!isUpdate) {
    //     saveHandler(userManagement)
    //   } else {
    //     updateHandler(userManagement)
    //   }
    // }
  }

  const saveHandler = async (userManagement) => {
    // const result = await UserManagementService.add(userManagement)
    // handleNotification(result, result.data.responseMsg)
    // if (result.data.responseCode !== '01') {
    //   onReset()
    //   close()
    // }
    // completed()
  }
  const updateHandler = async (userRoleMAnagement) => {
    // const result = await UserManagementService.edit(userManagement)
    // handleNotification(result, result.data.responseMsg)
    // if (result.data.responseCode !== '01') {
    //   onReset()
    //   close()
    // }
    // completed()
  }

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

  return (
    <div className="p-6">
      {/* <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {isUpdate ? "Update Inventory" : "Add Inventory"}
      </h2> */}

      <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4 p-4 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      {/* ID Field */}
      <CommonTextField 
        id="id" 
        name="id" 
        label="ID" 
        value={inventoryManagement?.id} 
        onChange={formOnChange} 
      />

      {/* Item Name - Select Dropdown */}
      {/* <CommonSelect 
        name="itemName" 
        label="Item Name" 
        value={inventoryManagement?.itemName} 
        // onChange={formOnChange}
      >
        <MenuItem value="Tables">Tables</MenuItem>
        <MenuItem value="Chairs">Chairs</MenuItem>
        <MenuItem value="Desks">Desks</MenuItem>
      </CommonSelect> */}

      {/* Is Refundable - Radio Group */}
      <CommonRadioGroup
        name="isRefundable"
        label="Is Refundable?"
        // value={inventoryManagement.isRefundable.toString()}
        // onChange={formOnChange}
        row
      >
        <FormControlLabel value="true" control={<Radio />} label="Yes" />
        <FormControlLabel value="false" control={<Radio />} label="No" />
      </CommonRadioGroup>

      {/* Description */}
      <CommonTextField 
        id="description" 
        name="description" 
        label="Description" 
        value={inventoryManagement.description} 
        onChange={formOnChange} 
      />

      {/* Purchase Price */}
      <CommonTextField 
        id="purchasePrice" 
        name="purchasePrice" 
        label="Purchase Price" 
        type="number" 
        value={inventoryManagement.purchasePrice} 
        onChange={formOnChange} 
      />

      {/* Sales Price */}
      <CommonTextField 
        id="salesPrice" 
        name="salesPrice" 
        label="Sales Price" 
        type="number" 
        value={inventoryManagement.salesPrice} 
        onChange={formOnChange} 
      />

      {/* Order Quantity */}
      <CommonTextField 
        id="orderQuantity" 
        name="orderQuantity" 
        label="Order Quantity" 
        type="number" 
        value={inventoryManagement.orderQuantity} 
        onChange={formOnChange} 
      />

      {/* Sales Quantity */}
      <CommonTextField 
        id="salesQuantity" 
        name="salesQuantity" 
        label="Sales Quantity" 
        type="number" 
        value={inventoryManagement.salesQuantity} 
        onChange={formOnChange} 
      />

      {/* Balance Quantity */}
      <CommonTextField 
        id="balanceQuantity" 
        name="balanceQuantity" 
        label="Balance Quantity" 
        type="number" 
        value={inventoryManagement.balanceQuantity} 
        onChange={formOnChange} 
      />

      {/* Created User */}
      <CommonTextField 
        id="createdUser" 
        name="createdUser" 
        label="Created User" 
        value={inventoryManagement.createdUser} 
        onChange={formOnChange} 
      />
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