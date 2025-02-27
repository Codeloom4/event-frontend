import ApiManager from "./Api/ApiManager";

class GalleryService {
  // Upload images in bulk
  uploadImages = async (eventType, groupName, images) => {
    const formData = new FormData();
    formData.append("eventType", eventType);
    formData.append("groupName", groupName);

    // Append each image to the FormData object
    images.forEach((image, index) => {
      formData.append("images", image); // Use "images" as the key
    });

    try {
      const response = await ApiManager.apiPost("/ems/gallery/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file uploads
        },
      });
      return response;
    } catch (error) {
      console.error("Failed to upload images:", error);
      throw error;
    }
  };

  // Get all images by event type
  getImagesByEventType = async (eventType) => {
    try {
      const response = await ApiManager.apiGet(`/ems/gallery/event/${eventType}`);
      return response;
    } catch (error) {
      console.error("Failed to fetch images by event type:", error);
      throw error;
    }
  };

  // Delete an image
  deleteImage = async (id) => {
    try {
      const response = await ApiManager.apiDelete(`/ems/gallery/${id}`);
      return response;
    } catch (error) {
      console.error("Failed to delete image:", error);
      throw error;
    }
  };

  // Update image group name
  updateImageGroupName = async (id, groupName) => {
    try {
      const response = await ApiManager.apiPut(`/ems/gallery/${id}`, { groupName });
      return response;
    } catch (error) {
      console.error("Failed to update group name:", error);
      throw error;
    }
  };

  // Get all images
  getAllImages = async () => {
    try {
      const response = await ApiManager.apiGetPublic("/api/public/gallery");
      return response;
    } catch (error) {
      console.error("Failed to fetch all images:", error);
      throw error;
    }
  };
}

export default new GalleryService();