import ApiManager from "./Api/ApiManager";

const inventoryStockEndpoint = "/ems/reports/inventory-stock";

class InventoryStockService {
  // Fetch inventory stock list
  getInventoryStockList = async () => {
    return ApiManager.apiGet(`${inventoryStockEndpoint}/list`);
  };

  // Generate Excel report
  generateExcelReport = async () => {
    return ApiManager.apiGet(`${inventoryStockEndpoint}/generate-excel`, null, {
      responseType: "blob", // Important for file downloads
    });
  };
}

export default new InventoryStockService();