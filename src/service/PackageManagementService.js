import ApiManager from "./Api/ApiManager";

const packageEndpoint = "/ems/package";

const PackageManagementService = {
  createPackage: async (data) => {
    try {
      const response = await ApiManager.apiPost(`${packageEndpoint}`, data);
      return response;
    } catch (error) {
      console.error("Sign-up failed:", error);
      throw error;
    }
  },

  access: async () => {
    try {
      const response = await ApiManager.apiGet(`${packageEndpoint}/access`);
      return response;
    } catch (error) {
      console.error("Get users failed:", error);
      throw error;
    }
  },

  getUsers: async (username) => {
    try {
      const response = await ApiManager.apiGet(
        `${packageEndpoint}/${username}`
      );
      return response;
    } catch (error) {
      console.error("Get users failed:", error);
      throw error;
    }
  },

  deleteUser: async (userId) => {
    try {
      const response = await ApiManager.apiDelete(
        `${packageEndpoint}/${userId}`
      );
      return response;
    } catch (error) {
      console.error("Get users failed:", error);
      throw error;
    }
  },
};

export default PackageManagementService;
