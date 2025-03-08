import React, { useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const UpdatableTableComponent = ({
  columns,
  data,
  title,
  onClickRow,
  fetchData,
  loading,
  pageCount: controlledPageCount,
  totalCount,
  style = {},
  updateAction, // Prop to handle updates
  editableColumns = [], // List of editable columns (e.g., ["Event Type", "Description"])
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setPageSize,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize, sortBy },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
      manualPagination: true,
      pageCount: controlledPageCount,
      manualSortBy: true,
    },
    useSortBy,
    usePagination
  );

  const [editableRow, setEditableRow] = useState(null); // Track which row is being edited
  const [editedValues, setEditedValues] = useState({}); // Store edited values

  // Enable editing for a specific row
  const handleEdit = (row) => {
    setEditableRow(row.id);
    setEditedValues({ ...row.original }); // Initialize edited values with the current row data
  };

  // Save the edited values
  const handleSave = () => {
    if (updateAction) {
      updateAction(editedValues); // Pass the updated row data to the parent component
    }
    setEditableRow(null); // Exit edit mode
  };

  // Handle changes in input fields
  const handleChange = (column, value) => {
    setEditedValues((prev) => ({
      ...prev,
      [column]: value,
    }));
  };

  return (
    <div className="p-4 overflow-hidden bg-gray-900 rounded-lg shadow-lg" style={style}>
      {title && <h6 className="mb-4 text-lg font-semibold text-white">{title}</h6>}
      <div className="overflow-x-auto">
        <table
          className="min-w-full border-separate rounded-md table-auto border-spacing-0"
          {...getTableProps()}
        >
          <thead className="bg-gray-800">
            {headerGroups.map((headerGroup, index) => (
              <tr
                key={`header-${index}`}
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column, index) => (
                  <th
                    key={`header-tr-${index}`}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={`px-4 py-2 text-sm text-gray-300 ${
                      column.isSorted
                        ? column.isSortedDesc
                          ? "text-blue-400"
                          : "text-blue-400"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      {column.render("Header")}
                      {column.isSorted &&
                        (column.isSortedDesc ? (
                          <KeyboardArrowDownIcon className="text-blue-400" />
                        ) : (
                          <KeyboardArrowUpIcon className="text-blue-400" />
                        ))}
                    </div>
                  </th>
                ))}
                {/* Actions Column with Same Styling */}
                <th className="px-4 py-2 text-sm text-gray-300">Actions</th>
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  key={`row-${row.id}`}
                  {...row.getRowProps()}
                  className="cursor-pointer hover:bg-gray-700"
                >
                  {row.cells.map((cell) => {
                    const columnId = cell.column.id;
                    const isEditable = editableColumns.includes(
                      cell.column.Header
                    ); // Check if the column is editable
                    return (
                      <td
                        key={`cell-${row.id}-${columnId}`}
                        {...cell.getCellProps()}
                        className="px-4 py-2 text-sm text-gray-300"
                      >
                        {editableRow === row.id && isEditable ? (
                          <input
                            type="text"
                            value={editedValues[columnId] || ""}
                            onChange={(e) =>
                              handleChange(columnId, e.target.value)
                            }
                            className="w-full px-2 py-1 text-gray-900 bg-gray-200 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          cell.render("Cell")
                        )}
                      </td>
                    );
                  })}
                  <td className="px-4 py-2">
                    {editableRow === row.id ? (
                      <button
                        onClick={handleSave}
                        className="px-3 py-1 text-white bg-green-500 rounded-md hover:bg-green-600"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(row)}
                        className="px-3 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center text-sm text-gray-300">
          <span>Show</span>
          <select
            className="p-1 ml-2 text-sm border border-gray-500 rounded-md bg-gray-800 text-gray-300"
            onChange={(e) => setPageSize(Number(e.target.value))}
            value={pageSize}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
          <span className="ml-2">entries</span>
        </div>

        {loading ? (
          <span className="text-sm text-gray-400">Loading...</span>
        ) : (
          <span className="text-sm text-gray-300">
            Showing {page.length} of {totalCount} results
          </span>
        )}

        <div className="flex items-center">
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="px-2 py-1 mr-2 border border-gray-500 rounded-md text-gray-300 hover:bg-gray-700"
          >
            Previous
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="px-2 py-1 ml-2 border border-gray-500 rounded-md text-gray-300 hover:bg-gray-700"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatableTableComponent;