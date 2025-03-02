import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import TableComponent from "../../component/Tables/TableComponent"; // Adjust the import path
import ItemService from "../../service/ItemService"; // Adjust the import path
import ItemAddUpdate from "../Item/ItemAddUpdate";
import CommonModal from "../../component/Modal/CommonModal";
import CommonTextField from "../../component/Form/CommonTextField"; // Adjust the import path
import CommonSelect from "../../component/Form/CommonSelect"; // Adjust the import path
import CommonRadioGroup from "../../component/Form/CommonRadioGroup"; // Adjust the import path
import CommonButton from "../../component/Form/CommonButton"; // Adjust the import path
import { MenuItem } from "@mui/material";
import { FormControlLabel, Radio } from "@mui/material";

const Item = () => {
  const defaultPageLimit = 5; // Define the default page limit

  const tableInitialModal = {
    pageIndex: 0,
    pageSize: defaultPageLimit,
    sortBy: [],
  };

  /**
   * @state use to set data to table
   */
  const [state, setState] = useState({
    count: 0,
    pagecount: 0,
    list: [],
  });

  // /**
  //  * @InventoryManagement state use to search params
  //  */
  // const [inventoryManagement, setInventoryManagement] = useState({});

  /**
   * @ItemManagement state use to search params
   */
  const [itemManagement, setItemManagement] = useState({});

  /**
   * @showAddUpdateModal to open ADD - Update modal and send Data when update a record
   */
  const [showAddUpdateModal, setShowAddUpdateModal] = useState({
    show: false,
    data: {},
  });

  /**
   * @isUpdate state use to identify update or not
   */
  const [isUpdate, setIsUpdate] = useState(false);

  /**
   * @viewInventoryManagement to open view modal
   */
  const [viewInventoryManagement, setViewInventoryManagement] = useState({
    isView: false,
    data: {},
  });

  /**
   * @viewItemManagement to open view modal
   */
  const [viewItemManagement, setViewItemManagement] = useState({
    isView: false,
    data: {},
  });

  /**
   * @search state use to save search params
   */
  const [search, setSearch] = useState(tableInitialModal);

  /**
   * @isSearch is Search btn Clicked
   */
  const [isSearch, setIsSearch] = useState(true);

  const [DropdownItemDetails, setDropdownItemDetails] = useState([]);

  /**
   * @resetstate for grid reset
   */
  const resetState = useRef(false);

  //initial step
  useEffect(() => {
    // getDropdownItemDetails();
    onReset();
  }, []);

  useEffect(() => {
    if (resetState.current === true) {
      console.log("resetState.current", resetState.current);
      retriveData(tableInitialModal);
    }
  }, [resetState.current]);

  //Get Dropdown Item Details
  // const getDropdownItemDetails = async () => {
  //   try {
  //     const result = await ItemService.access();
  //     setDropdownItemDetails(result?.data?.content || []);
  //   } catch (e) {
  //     console.log("setDropdownItemDetails Error : ", e);
  //   }
  // };

  //reset
  const onReset = () => {
    setItemManagement({
      id: "",
      itemName: "",
      isRefundable: "",
      avgPrice: "",
      quantity: "",
      updatedAt: "",
      createdUser: "",
    });
  };

  /**
   * @retriveData for table
   */
  const retriveData = async (pageDetails) => {
    // setLoading(true)
    // set state api call set
    setSearch(pageDetails);
    const dataState = await onClickSearch(
      pageDetails.pageIndex,
      pageDetails.pageSize,
      pageDetails.sortBy.length !== 0
        ? pageDetails.sortBy[0].id
          ? pageDetails.sortBy[0].id
          : ""
        : "",
      pageDetails.sortBy.length !== 0 ? pageDetails.sortBy[0].desc : null
    );
    setState(dataState?.data?.content);
    resetState.current = false;
    // setInitialPageList(dataState.data.content?.list)
    // setLoading(false)
  };

  //Search
  const onClickSearch = async (page, size, sortCol, sortType) => {
    const result = await ItemService
      .getList
      // page,
      // size,
      // sortCol,
      // sortType,
      // isSearch,
      // itemManagement
      ();
    // handleNotification(result, result.data.responseMsg)
    // addToChips()
    return result;
  };

  //view
  const onClickView = (data) => {
    setViewInventoryManagement({ isView: true, data: data });
    onClickBackUpdate();
  };
  const onClickViewBack = () => {
    setViewInventoryManagement({ isView: false, data: {} });
    retriveData(search);
    // retriveDataDualAuth(tableInitialModal)
  };

  //Update
  const onClickUpdate = (data) => {
    setIsUpdate(true);
    setShowAddUpdateModal({ show: true, data: data });
    // onClickViewBack();
  };

  const onClickBackUpdate = () => {
    setIsUpdate(false);
  };

  //add record
  const onClickAdd = () => {
    setShowAddUpdateModal({ show: true, data: {} });
    setIsUpdate(false);
  };

  //Delete Record
  const onClickDelete = async (data) => {
    const result = await ItemService.delete(data);
    // handleNotification(result, result.data.responseMsg)
    await retriveData(search);
  };

  //Filter
  const onChangeFilter = (arg) => {
    // const filterdList: any[] = filterArray(initialPageList, arg)
    // const newState = produce(state, (draft) => {
    //   draft.list = filterdList
    // })
    // setState(newState)
  };

  const resetRef = () => {
    resetState.current = true;
  };

  const [editingItem, setEditingItem] = useState(null); // Track the item being edited
  const [isAdding, setIsAdding] = useState(false); // Track if adding a new item

  const columns = useMemo(
    () => [
      {
        Header: "id",
        accessor: "id",
      },
      {
        Header: "Item Name",
        accessor: "itemName",
      },
      {
        Header: "Refundable",
        accessor: "isRefundable",
        Cell: ({ value }) => (value ? "Yes" : "No"), // Convert boolean to Yes/No
      },
      {
        Header: "Avg Price",
        accessor: "avgPrice",
        // Cell: ({ value }) => `Rs${value.toFixed(2)}`, // Format price as currency
      },
      {
        Header: "Quantity",
        accessor: "quantity",
      },
      {
        Header: "update Date-Time",
        accessor: "updatedAt",
        // Cell: ({ value }) => `Rs${value.toFixed(2)}`, // Format price as currency
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <CommonButton
              type="update"
              label="update"
              onClick={() => onClickUpdate(row.original)}
            />

            <CommonButton
              type="delete"
              label="Delete"
              onClick={() => onClickDelete(row.original.id)}
            />
          </div>
        ),
      },
    ],
    []
  );

  const handleFilter = useCallback((filterValue) => {
    console.log("Filter applied:", filterValue);
    // Implement filtering logic here if needed
  }, []);

  const handleRowClick = (rowData) => {
    console.log("Row clicked:", rowData);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsAdding(false);
  };

  const handleDelete = (id) => {
    // setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleSave = (newItem) => {
    if (editingItem) {
      // Update existing item
      // setData((prevData) =>
      //   prevData.map((item) => (item.id === editingItem.id ? newItem : item))
      // );
      setEditingItem(null);
    } else {
      // // Add new item
      // setData((prevData) => [
      //   ...prevData,
      //   { ...newItem, id: prevData.length + 1 },
      // ]);
    }
    setIsAdding(false);
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setIsAdding(true);
  };

  const formOnChange = (e) => {
    const { name, value, type } = e.target;
    setItemManagement((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  console.log("itemManagement  111111111------->>>>> ", itemManagement);
  console.log("itemManagement  state 222222------>>>>> ", state);
  console.log("itemManagement  ------->>>>> ", itemManagement);

  return (
    <div className="min-h-screen p-6 App bg-gray-50">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Item Management</h1>

      {/* Add New Item Button */}
      <div className="flex flex-row-reverse mb-4">
        <CommonButton
          type="add"
          label="Add New Item"
          onClick={() => onClickAdd()}
        />
      </div>

      {/* <div className="p-6 flex gap-4">
        <CommonButton
          type="search"
          label="Search"
          onClick={() => alert("Search Clicked")}
        />
        <CommonButton
          type="add"
          label="Add"
          onClick={() => alert("Add Clicked")}
        />
        <CommonButton
          type="update"
          label="Update"
          onClick={() => alert("Update Clicked")}
        />
        <CommonButton
          type="delete"
          label="Delete"
          onClick={() => alert("Delete Clicked")}
        />
        <CommonButton
          type="confirm"
          label="Confirm"
          onClick={() => alert("Confirm Clicked")}
        />
        <CommonButton
          type="reject"
          label="Reject"
          onClick={() => alert("Reject Clicked")}
        /> */}

      {/* Disabled Button Example */}
      {/* <CommonButton type="add" label="Disabled Add" disabled />
      </div> */}

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
      <div className="mt-4">
        <CommonButton
          type="search"
          label="Search"
          onClick={() => alert("Search Not working")}
        />
      </div>

      {/* add update modal */}
      <CommonModal
        showModal={showAddUpdateModal.show}
        size="xl"
        handleClose={() => {
          setShowAddUpdateModal({
            show: false,
            data: {},
          });
        }}
        title={isUpdate ? "Update Item" : "Add Item"}
      >
        {/* <p>This is a reusable modal component using Tailwind CSS.</p> */}
        <ItemAddUpdate
          isUpdate={isUpdate}
          data={isUpdate ? showAddUpdateModal.data : {}}
          close={() => {
            setShowAddUpdateModal({
              show: false,
              data: {},
            });
          }}
          completed={() => {
            retriveData(search);
          }}
        />
      </CommonModal>

      {/* Table Component */}
      <TableComponent
        columns={columns}
        data={state?.list || []}
        loading={false}
        fetchData={retriveData}
        onFilter={handleFilter}
        onClickRow={handleRowClick}
        totalCount={state?.count}
        pageCount={state?.pagecount}
      />
    </div>
  );
};

export default Item;
