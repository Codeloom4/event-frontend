import ApiManager from "./Api/ApiManager";

const userEndpoint = "/ems/user";

const UserManagement = {
  signUp: async (data) => {
    try {
      const response = await ApiManager.apiPost(
        `${userEndpoint}/register`,
        data
      );
      return response;
    } catch (error) {
      console.error("Sign-up failed:", error);
      throw error;
    }
  },

  getUsers: async (username) => {
    try {
      const response = await ApiManager.apiGet(`${userEndpoint}/${username}`);
      return response;
    } catch (error) {
      console.error("Get users failed:", error);
      throw error;
    }
  },
};

export default UserManagement;
