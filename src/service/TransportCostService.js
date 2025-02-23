import ApiManager from "./Api/ApiManager";

const transportCostsEndpoint = "/ems/transport-costs";

class TransportCostService {
  // Fetch all transport costs
  getTransportCostsList = async () => {
    return ApiManager.apiGet(transportCostsEndpoint);
  };

  // Fetch all districts
  getDistrictsList = async () => {
    return ApiManager.apiGet(`${transportCostsEndpoint}/districts`);
  };

  // Add a new transport cost
  createTransportCost = async (data) => {
    return ApiManager.apiPost(transportCostsEndpoint, data);
  };

  // Update a transport cost
  updateTransportCost = async (data) => {
    return ApiManager.apiPut(`${transportCostsEndpoint}/${data.id}`, data);
  };

  // Delete a transport cost
  deleteTransportCost = async (id) => {
    return ApiManager.apiDelete(`${transportCostsEndpoint}/${id}`);
  };
}

export default new TransportCostService();