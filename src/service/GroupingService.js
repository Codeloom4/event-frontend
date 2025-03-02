import ApiManager from "./Api/ApiManager";

const groupingEndpoint = "/ems/groupings";

class GroupingService {
    // Fetch all groupings for a specific user
    getGroupingsByUsername = async (username) => {
        return ApiManager.apiGet(`${groupingEndpoint}?username=${username}`);
    };

    createGrouping = async (groupingData, file) => {
        const formData = new FormData();
    
        // Create a new object without the "file" field
        const { file: _, ...groupingDataWithoutFile } = groupingData;
    
        // Convert groupingDataWithoutFile to JSON string
        const groupingJson = JSON.stringify(groupingDataWithoutFile);
        formData.append("grouping", groupingJson);
    
        // Append the file (if provided)
        if (file) {
            formData.append("file", file);
        }
    
        return ApiManager.apiPost(groupingEndpoint, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    };

    // Update an existing grouping
    updateGrouping = async (id, groupingData, file) => {
        const formData = new FormData();
    
        // Create a new object without the "file" field
        const { file: _, ...groupingDataWithoutFile } = groupingData;
    
        // Convert groupingDataWithoutFile to JSON string
        const groupingJson = JSON.stringify(groupingDataWithoutFile);
        formData.append("grouping", groupingJson);
    
        // Append the file (if provided)
        if (file) {
            formData.append("file", file);
        }
    
        return ApiManager.apiPut(`${groupingEndpoint}/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    };

    // Delete a grouping
    deleteGrouping = async (id) => {
        return ApiManager.apiDelete(`${groupingEndpoint}/${id}`);
    };

    // Process a grouping (generate PDF)
    processGrouping = async (id) => {
        return ApiManager.apiPost(`${groupingEndpoint}/${id}/process`);
    };
}

export default new GroupingService();