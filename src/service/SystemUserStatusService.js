import ApiManager from "./Api/ApiManager";

const systemUserStatusEndpoint = "/ems/reports/system-user-status";

class SystemUserStatusService {
  // Fetch system user status list
  getSystemUserStatusList = async () => {
    const token = sessionStorage.getItem("token");
    console.log("Token:", token); // Log the token
    return ApiManager.apiGet(`${systemUserStatusEndpoint}/list`);
  };

 // Generate Excel report
generateExcelReport = async () => {
    return ApiManager.apiGet(`${systemUserStatusEndpoint}/generate-excel`, null, {
      responseType: "blob", // Important for file downloads
    });
  };
}

export default new SystemUserStatusService();
