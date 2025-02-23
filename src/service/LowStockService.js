import ApiManager from "./Api/ApiManager";

const lowStockEndpoint = "/ems/reports/low-stock";

class LowStockService {
  // Fetch low stock list
  getLowStockList = async () => {
    return ApiManager.apiGet(`${lowStockEndpoint}/list`);
  };

  // Generate Excel report
  generateExcelReport = async () => {
    return ApiManager.apiGet(`${lowStockEndpoint}/generate-excel`, null, {
      responseType: "blob", // Important for file downloads
    });
  };
}

export default new LowStockService();