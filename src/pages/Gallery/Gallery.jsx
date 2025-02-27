import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import PublicService from "../../service/PublicService"; // Import PublicService
import GalleryService from "../../service/GalleryService"; // Import PublicService
import CommonModal from "../../component/Modal/CommonModal";
import UploadForm from "./UploadForm";
import { FaSpinner } from "react-icons/fa"; // Import spinner for loading state

const Gallery = () => {
  const { authContextData } = useAuth();
  const { isAuthenticated, userRole } = authContextData;
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch all images for the public gallery page
  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await GalleryService.getAllImages(); // Fetch images using PublicService
      console.log(response)
      if (response.data.responseCode === "00") {
        setImages(response.data.content);
      }
    } catch (error) {
      console.error("Failed to fetch images:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch images on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  // Handle upload button click
  const handleUploadClick = () => {
    setShowModal(true); // Open the popup box immediately
  };

  // Handle image upload
  const handleUpload = async (formData) => {
    try {
      const response = await GalleryService.uploadImages(
        formData.eventType,
        formData.groupName,
        formData.images
      );
      if (response.data.responseCode === "00") {
        alert("Images uploaded successfully!");
        setShowModal(false);
        fetchImages(); // Refresh the gallery
      }
    } catch (error) {
      console.error("Failed to upload images:", error);
      alert("Failed to upload images. Please try again.");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-center mb-8">Gallery</h1>

      {/* Upload Button */}
      {isAuthenticated && (userRole === "ADMIN" || userRole === "EMPLOYEE") && (
        <button
          onClick={handleUploadClick}
          className="px-4 py-2 mb-4 text-white bg-green-500 rounded-md hover:bg-green-600"
        >
          Upload Images
        </button>
      )}

      {/* Image Grid */}
      {loading ? (
        <div className="flex justify-center">
          <FaSpinner className="animate-spin text-4xl" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div key={image.id} className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={image.imageUrl}
                alt={image.group_name}
                className="w-full h-48 object-cover rounded-md"
              />
              <p className="mt-2 text-center text-sm text-gray-600">
                {image.group_name}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showModal && (
        <CommonModal
          showModal={showModal}
          handleClose={() => setShowModal(false)}
          title="Upload Images"
        >
          <UploadForm onSubmit={handleUpload} />
        </CommonModal>
      )}
    </div>
  );
};

export default Gallery;