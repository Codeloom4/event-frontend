import ApiManager from "./Api/ApiManager";

const authEndpoint = "/api/auth";

const AuthenticationService = {
  login: async (username, password) => {
    try {
      const response = await ApiManager.apiPostLogin(authEndpoint, {
        username,
        password,
      });
      return response;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },

  resetPassword: async (data) => {
    try {
      const response = await ApiManager.apiPost(`${authEndpoint}/reset`, data);
      return response;
    } catch (error) {
      console.error("Sign-up failed:", error);
      throw error;
    }
  },
};

export default AuthenticationService;
