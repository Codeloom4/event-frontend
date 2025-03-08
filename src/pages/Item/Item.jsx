import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import TableComponent from "../../component/Tables/TableComponent";
import ItemService from "../../service/ItemService";
import ItemAddUpdate from "../Item/ItemAddUpdate";
import CommonModal from "../../component/Modal/CommonModal";
import CommonTextField from "../../component/Form/CommonTextField";
import CommonSelect from "../../component/Form/CommonSelect";
import CommonRadioGroup from "../../component/Form/CommonRadioGroup";
import CommonButton from "../../component/Form/CommonButton";
import { MenuItem } from "@mui/material";
import { FormControlLabel, Radio } from "@mui/material";
import { displayApiMessage } from "../../context/ToastContext";

const Item = () => {
  const defaultPageLimit = 5; // Define the default page limit

  const tableInitialModal = {
    pageIndex: 0,
    pageSize: defaultPageLimit,
    sortBy: [],
  };

  const [state, setState] = useState({
    count: 0,
    pagecount: 0,
    list: [],
  });

  const [itemManagement, setItemManagement] = useState({});

  const [showAddUpdateModal, setShowAddUpdateModal] = useState({
    show: false,
    data: {},
  });

  const [isUpdate, setIsUpdate] = useState(false);

  const [viewItemManagement, setViewItemManagement] = useState({
    isView: false,
    data: {},
  });

  const [search, setSearch] = useState(tableInitialModal);

  const [isSearch, setIsSearch] = useState(true);

  const [DropdownItemDetails, setDropdownItemDetails] = useState([]);

  const resetState = useRef(false);

  useEffect(() => {
    onReset();
  }, []);

  useEffect(() => {
    if (resetState.current === true) {
      retriveData(tableInitialModal);
    }
  }, [resetState.current]);

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

  const retriveData = async (pageDetails) => {
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
  };

  const onClickSearch = async (page, size, sortCol, sortType) => {
    const result = await ItemService.getList();
    return result;
  };

  const onClickUpdate = (data) => {
    setIsUpdate(true);
    setShowAddUpdateModal({ show: true, data: data });
  };

  const onClickBackUpdate = () => {
    setIsUpdate(false);
  };

  const onClickAdd = () => {
    setShowAddUpdateModal({ show: true, data: {} });
    setIsUpdate(false);
  };

  const onClickDelete = async (data) => {
    const result = await ItemService.delete(data);
    displayApiMessage(result.data.responseMsg);
    await retriveData(search);
  };

  const resetRef = () => {
    resetState.current = true;
  };

  const [editingItem, setEditingItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Item Name",
        accessor: "itemName",
      },
      {
        Header: "Refundable",
        accessor: "isRefundable",
        Cell: ({ value }) => (value ? "Yes" : "No"),
      },
      {
        Header: "Avg Price",
        accessor: "avgPrice",
      },
      {
        Header: "Quantity",
        accessor: "quantity",
      },
      {
        Header: "Update Date-Time",
        accessor: "updatedAt",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <CommonButton
              type="update"
              label="Update"
              onClick={() => onClickUpdate(row.original)}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            />
            <CommonButton
              type="delete"
              label="Delete"
              onClick={() => onClickDelete(row.original.id)}
              className="bg-red-500 hover:bg-red-600 text-white"
            />
          </div>
        ),
      },
    ],
    []
  );

  const handleFilter = useCallback((filterValue) => {
    console.log("Filter applied:", filterValue);
  }, []);

  const handleRowClick = (rowData) => {
    console.log("Row clicked:", rowData);
  };

  const formOnChange = (e) => {
    const { name, value, type } = e.target;
    setItemManagement((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Item Management
        </h1>

        {/* Add New Item Button */}
        <div className="flex flex-row-reverse mb-6">
          <CommonButton
            type="add"
            label="Add New Item"
            onClick={onClickAdd}
            className="bg-green-500 hover:bg-green-600 text-white"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Fields */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"> */}
          {/* Commented out other fields */}
          {/* <CommonTextField
            id="id"
            name="id"
            label="ID"
            value={itemManagement?.id}
            onChange={formOnChange}
            className="bg-gray-700 text-white"
          /> */}
          <CommonTextField
            id="itemName"
            name="itemName"
            label="Item Name"
            value={itemManagement?.itemName}
            onChange={formOnChange}
            className="bg-gray-700 text-white"
          />
          {/* Is Refundable - Radio Group */}
          <CommonRadioGroup name="isRefundable" label="Is Refundable?" row>
            <FormControlLabel
              value="true"
              control={<Radio />}
              label="Yes"
              className="text text-gray-300"
            />
            <FormControlLabel
              value="false"
              control={<Radio />}
              label="No"
              className="text text-gray-300"
            />
          </CommonRadioGroup>
          {/* Commented out other fields */}
          {/* <CommonTextField
            id="avgPrice"
            name="avgPrice"
            label="Avg Price"
            type="number"
            value={itemManagement.avgPrice}
            onChange={formOnChange}
            className="bg-gray-700 text-white"
          />
          <CommonTextField
            id="quantity"
            name="quantity"
            label="Quantity"
            type="number"
            value={itemManagement.quantity}
            onChange={formOnChange}
            className="bg-gray-700 text-white"
          />
          <CommonTextField
            id="updatedAt"
            name="updatedAt"
            label="Updated Date-Time"
            value={itemManagement?.updatedAt}
            onChange={formOnChange}
            className="bg-gray-700 text-white"
          />
          <CommonTextField
            id="createdUser"
            name="createdUser"
            label="Created User"
            value={itemManagement?.createdUser}
            onChange={formOnChange}
            className="bg-gray-700 text-white"
          /> */}
        </div>

        {/* Search Button */}
        {/* <div className="flex justify-center mb-6"> */}
          <CommonButton
            type="search"
            label="Search"
            onClick={() => alert("Search Not working")}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          />
        {/* </div> */}

        {/* Add/Update Modal */}
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
          className="w-full"
          headerClassName="bg-gray-700 text-gray-300"
          rowClassName="hover:bg-gray-600 transition-colors duration-200"
          cellClassName="px-6 py-4 text-sm text-gray-300"
        />
      </div>
    </div>
  );
};

export default Item;