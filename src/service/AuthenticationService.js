import ApiManager from "./ApiManager/ApiManager";

class AuthenticationService {
  /**
   * Login user and store tokens.
   * @param {object} user - User credentials (username and password).
   * @returns {Promise} - API response.
   */
  login = async (user) => {
    try {
      const response = await ApiManager.post("/auth/login", user);

      if (response.status === 200) {
        const { token, refreshToken, username } = response.data;

        // Save tokens and username to local storage
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("username", username);
      }

      return response;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  /**
   * Logout user and clear tokens.
   * @returns {Promise} - API response.
   */
  logout = async () => {
    try {
      const response = await ApiManager.post("/auth/logout", {});

      // Clear tokens and username from local storage
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("username");

      return response;
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  /**
   * Refresh authentication token.
   * @returns {Promise} - API response.
   */
  refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await ApiManager.post("/auth/refresh-token", {
        refreshToken,
      });

      if (response.status === 200) {
        const { token } = response.data;

        // Save new token to local storage
        localStorage.setItem("token", token);
      }

      return response;
    } catch (error) {
      console.error("Token refresh failed:", error);
      throw error;
    }
  };

  /**
   * Get the current authentication token.
   * @returns {string|null} - The token if it exists, otherwise null.
   */
  getToken = () => {
    return localStorage.getItem("token");
  };

  /**
   * Get the current username.
   * @returns {string|null} - The username if it exists, otherwise null.
   */
  getUsername = () => {
    return localStorage.getItem("username");
  };

  /**
   * Check if the user is authenticated.
   * @returns {boolean} - True if the user is authenticated, otherwise false.
   */
  isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };
}

export default new AuthenticationService();
