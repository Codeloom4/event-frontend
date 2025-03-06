import React, { useState } from "react";
import InventoryStockService from "../../service/InventoryStockService";
import { FaSpinner } from "react-icons/fa";
import CommonButton from "../../component/Form/CommonButton";
import TableComponent from "../../component/Tables/TableComponent";

const InventoryStockReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isGeneratingExcel, setIsGeneratingExcel] = useState(false);

  // Fetch data for the Inventory Stock Report
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await InventoryStockService.getInventoryStockList();
      if (response.data.responseCode === "00") {
        setData(response.data.content);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Generate Excel file
  const handleGenerateExcel = async () => {
    setIsGeneratingExcel(true);
    try {
      const response = await InventoryStockService.generateExcelReport();

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a link element
      const link = document.createElement("a");
      link.href = url;

      // Set the download attribute with the file name
      const contentDisposition = response.headers["content-disposition"];
      let fileName = "inventory_stock_report.xlsx"; // Default file name
      if (contentDisposition && contentDisposition.includes("filename=")) {
        fileName = contentDisposition
          .split("filename=")[1]
          .split(";")[0]
          .replace(/['"]/g, ""); // Extract file name from headers
      }
      link.setAttribute("download", fileName);

      // Append the link to the DOM and trigger the download
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating Excel:", error);
    } finally {
      setIsGeneratingExcel(false);
    }
  };

  // Table columns
  const columns = [
    { Header: "Item Name", accessor: "itemName" },
    { Header: "Available Quantity", accessor: "availableQuantity" },
    { Header: "Ordered Quantity", accessor: "orderedQuantity" },
    { Header: "Sold Quantity", accessor: "soldQuantity" },
    { Header: "Is Refundable", accessor: "isRefundable" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Inventory Stock Report
        </h1>
        <div className="flex justify-center space-x-4 mb-6">
          {/* Search Button */}
          <CommonButton
            label="Search"
            onClick={fetchData}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          />
          {/* Generate Excel Button */}
          <CommonButton
            label={isGeneratingExcel ? <FaSpinner className="animate-spin" /> : "Generate Excel"}
            onClick={handleGenerateExcel}
            disabled={isGeneratingExcel}
            className="bg-green-500 hover:bg-green-600 text-white"
          />
        </div>
        {/* Table Component */}
        <TableComponent
          columns={columns}
          data={data}
          loading={loading}
          totalCount={data.length}
          pageCount={Math.ceil(data.length / 10)}
          className="w-full"
          headerClassName="bg-gray-700 text-gray-300"
          rowClassName="hover:bg-gray-600 transition-colors duration-200"
          cellClassName="px-6 py-4 text-sm text-gray-300"
        />
      </div>
    </div>
  );
};

export default InventoryStockReport;