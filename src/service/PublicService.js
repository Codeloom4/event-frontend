// src/service/PublicService.js
import ApiManager from "./Api/ApiManager";

const publicEndpoint = "/api/public";

class PublicService {
  // Fetch services data using the public API call
  getServices = async () => {
    return ApiManager.apiGetPublic(`${publicEndpoint}/services`);
  };
}

export default new PublicService();