import React, { useState, useMemo, useCallback } from "react";
import TableComponent from "../../component/Tables/TableComponent"; // Adjust the import path

const Inventory = () => {
  const [data, setData] = useState([
    { id: 1, itemName: "Balloons", quantity: 100, price: 50 },
    { id: 2, itemName: "Party Hats", quantity: 50, price: 100 },
    { id: 3, itemName: "Streamers", quantity: 30, price: 250 },
  ]);

  const [editingItem, setEditingItem] = useState(null); // Track the item being edited
  const [isAdding, setIsAdding] = useState(false); // Track if adding a new item

  const columns = useMemo(
    () => [
      {
        Header: "Item Name",
        accessor: "itemName",
      },
      {
        Header: "Quantity",
        accessor: "quantity",
      },
      {
        Header: "Price ",
        accessor: "price",
        Cell: ({ value }) => `Rs${value.toFixed(2)}`, // Format price as currency
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              onClick={() => handleEdit(row.original)}
              className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(row.original.id)}
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
            >
              Delete
            </button>
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
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleSave = (newItem) => {
    if (editingItem) {
      // Update existing item
      setData((prevData) =>
        prevData.map((item) => (item.id === editingItem.id ? newItem : item))
      );
      setEditingItem(null);
    } else {
      // Add new item
      setData((prevData) => [
        ...prevData,
        { ...newItem, id: prevData.length + 1 },
      ]);
    }
    setIsAdding(false);
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setIsAdding(true);
  };

  return (
    <div className="App p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Inventory Management</h1>

      {/* Add New Item Button */}
      <button
        onClick={handleAddNew}
        className="mb-6 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
      >
        Add New Item
      </button>

      {/* Add/Edit Form */}
      {(isAdding || editingItem) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {editingItem ? "Edit Item" : "Add New Item"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const newItem = {
                  id: editingItem ? editingItem.id : data.length + 1,
                  itemName: formData.get("itemName"),
                  quantity: parseInt(formData.get("quantity"), 10),
                  price: parseFloat(formData.get("price")),
                };
                handleSave(newItem);
              }}
              className="space-y-4"
            >
              <label className="block">
                <span className="text-gray-700">Item Name:</span>
                <input
                  type="text"
                  name="itemName"
                  defaultValue={editingItem ? editingItem.itemName : ""}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Quantity:</span>
                <input
                  type="number"
                  name="quantity"
                  defaultValue={editingItem ? editingItem.quantity : ""}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Price (USD):</span>
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  defaultValue={editingItem ? editingItem.price : ""}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </label>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table Component */}
      <TableComponent
        columns={columns}
        data={data}
        loading={false}
        onFilter={handleFilter}
        onClickRow={handleRowClick}
        totalCount={data.length}
        pageCount={Math.ceil(data.length / 5)}
      />
    </div>
  );
};

export default Inventory;