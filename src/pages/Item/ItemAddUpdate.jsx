import React, { useState, useEffect } from "react";
import produce from "immer";
import { MenuItem } from "@mui/material";
import { FormControlLabel, Radio } from "@mui/material";
import CommonTextField from "../../component/Form/CommonTextField"; // Adjust the import path
import CommonSelect from "../../component/Form/CommonSelect"; // Adjust the import path
import CommonRadioGroup from "../../component/Form/CommonRadioGroup"; // Adjust the import path
import ItemService from "../../service/ItemService"; // Adjust the import path
import CommonButton from "../../component/Form/CommonButton"; // Adjust the import path

const ItemAddUpdate = ({ isUpdate, data, close, completed }) => {
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
  const [itemManagement, setItemManagement] = useState({});

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
      const result = await ItemService.access();
      setDropdownItemDetails(result?.data?.content);
      console.log("getDropdownItemDetails result : ", result);
    } catch (e) {
      console.log("setDropdownItemDetails Error : ", e);
    }
  };

  const onReset = () => {
    setItemManagement({
      id: isUpdate ? data?.id : "",
      itemName: isUpdate ? data?.itemName : "",
      isRefundable: isUpdate ? data?.isRefundable : "",
      avgPrice: isUpdate ? data?.avgPrice : "",
      quantity: isUpdate ? data?.quantity : "",
      updatedAt: isUpdate ? data?.updatedAt : "",
      createdUser: isUpdate ? data?.createdUser : "",
    });
    setInventoryManagementErrors({});
  };

  const onClickAddUpdate = (itemManagement) => {
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
      saveHandler(itemManagement);
    } else {
      updateHandler(itemManagement);
    }
    // }
  };

  const saveHandler = async (itemManagement) => {
    const result = await ItemService.add(itemManagement);
    // handleNotification(result, result.data.responseMsg)
    if (result.data.responseCode !== "01") {
      onReset();
      close();
    }
    completed()
  };
  const updateHandler = async (itemManagement) => {
    const result = await ItemService.edit(itemManagement)
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
    setItemManagement((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  console.log("itemManagement  ------->>>>> ", itemManagement);
  console.log("DropdownItemDetails  ------->>>>> ", DropdownItemDetails);

  return (
    <div className="p-6">
      {/* <h2 className="mb-6 text-2xl font-semibold text-gray-800">
        {isUpdate ? "Update Inventory" : "Add Inventory"}
      </h2> */}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* <div className="max-w-lg p-4 mx-auto space-y-4 bg-white rounded-lg shadow-md"> */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ID Field */}
        <CommonTextField
          id="id"
          name="id"
          label="ID"
          value={itemManagement?.id}
          onChange={formOnChange}
        />
        <CommonTextField
          id="itemName"
          name="itemName"
          label="Item Name"
          value={itemManagement?.itemName}
          onChange={formOnChange}
        />
        {/* Is Refundable - Radio Group */}
        <CommonRadioGroup
          name="isRefundable"
          label="Is Refundable?"
          // value={itemManagement.isRefundable.toString()}
          // onChange={formOnChange}
          row
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
          id="avgPrice"
          name="avgPrice"
          label="Avg Price"
          type="number"
          value={itemManagement.avgPrice}
          onChange={formOnChange}
        />
        <CommonTextField
          id="quantity"
          name="quantity"
          label="Quantity"
          type="number"
          value={itemManagement.quantity}
          onChange={formOnChange}
        />
        <CommonTextField
          id="updatedAt"
          name="updatedAt"
          label="Updated Date-Time"
          value={itemManagement?.updatedAt}
          onChange={formOnChange}
        />
        <CommonTextField
          id="createdUser"
          name="createdUser"
          label="Created User"
          value={itemManagement?.createdUser}
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
            onClick={() => onClickAddUpdate(itemManagement)}
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

export default ItemAddUpdate;
