import ApiManager from "./Api/ApiManager";

const salesRevenueEndpoint = "/ems/reports/sales-revenue";

class SalesRevenueService {
  // Fetch sales revenue list
  getSalesRevenueList = async () => {
    return ApiManager.apiGet(`${salesRevenueEndpoint}/list`);
  };

  // Generate Excel report
  generateExcelReport = async () => {
    return ApiManager.apiGet(`${salesRevenueEndpoint}/generate-excel`, null, {
      responseType: "blob", // Important for file downloads
    });
  };
}

export default new SalesRevenueService();