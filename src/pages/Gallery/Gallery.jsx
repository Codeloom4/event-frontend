import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import GalleryService from "../../service/GalleryService";
import CommonModal from "../../component/Modal/CommonModal";
import UploadForm from "./UploadForm";
import { FaSpinner, FaTrash, FaEdit } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { RESPONSE_CODES } from "../../utils/constants";

const Gallery = () => {
  const { authContextData } = useAuth();
  const { isAuthenticated, userRole } = authContextData;
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedGroupName, setSelectedGroupName] = useState(null);

  // Fetch all images for the public gallery page
  const fetchImages = async () => {
    setLoading(true);
    const response = await GalleryService.getAllImages();
    if (response.data.responseCode === RESPONSE_CODES.SUCCESS) {
      setImages(response.data.content);
    }
    setLoading(false);
  };

  // Fetch images on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  // Handle upload button click
  const handleUploadClick = () => {
    setShowModal(true);
  };

  // Handle delete group
  const handleDeleteGroup = async (groupName) => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      const response = await GalleryService.deleteGroup(groupName);
      if (response.data.responseCode === RESPONSE_CODES.SUCCESS) {
        alert("Group deleted successfully!");
        fetchImages(); // Refresh the gallery
      } else {
        alert("Failed to delete group.");
      }
    }
  };

  // Handle update group
  const handleUpdateGroup = (groupName) => {
    setSelectedGroupName(groupName);
    setShowModal(true);
  };

  // Group images by event type and then by group name
  const groupImages = (images) => {
    const grouped = {};

    images.forEach((image) => {
      if (!grouped[image.eventType]) {
        grouped[image.eventType] = {
          description: image.eventDescription,
          groups: {},
        };
      }
      if (!grouped[image.eventType].groups[image.groupName]) {
        grouped[image.eventType].groups[image.groupName] = [];
      }
      grouped[image.eventType].groups[image.groupName].push(image);
    });

    return grouped;
  };

  // Handle group click to show slideshow
  const handleGroupClick = (group) => {
    setSelectedGroup(group);
  };

  // Close slideshow
  const closeSlideshow = () => {
    setSelectedGroup(null);
  };

  const groupedImages = groupImages(images);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Gallery
        </h1>

        {/* Upload Button */}
        {isAuthenticated &&
          (userRole === "ADMIN" || userRole === "EMPLOYEE") && (
            <button
              onClick={handleUploadClick}
              className="px-4 py-2 mb-8 text-white bg-green-500 rounded-md hover:bg-green-600"
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
          Object.keys(groupedImages).map((eventType) => (
            <div key={eventType} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {groupedImages[eventType].description}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Object.keys(groupedImages[eventType].groups).map(
                  (groupName) => (
                    <div
                      key={groupName}
                      className="bg-white p-4 rounded-lg shadow-md"
                    >
                      {/* <div className="grid grid-cols-2 gap-2">
                      {groupedImages[eventType].groups[groupName]
                        .slice(0, 4)
                        .map((image) => (
                          <img
                            key={image.id}
                            src={image.imageUrl}
                            alt={image.groupName}
                            className="w-full h-24 object-cover rounded-md cursor-pointer"
                            onClick={() => handleGroupClick(groupedImages[eventType].groups[groupName])}
                          />
                        ))}
                    </div> */}
                      <p className="mt-2 text-center text-sm text-gray-600">
                        {groupName}
                      </p>
                      {isAuthenticated &&
                        (userRole === "ADMIN" || userRole === "EMPLOYEE") && (
                          <div className="flex justify-center space-x-2 mt-2">
                            <button
                              onClick={() => handleUpdateGroup(groupName)}
                              className="px-2 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDeleteGroup(groupName)}
                              className="px-2 py-1 text-white bg-red-500 rounded-md hover:bg-red-600"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        )}
                    </div>
                  )
                )}
              </div>
            </div>
          ))
        )}

        {/* Slideshow Modal */}
        {selectedGroup && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-4xl">
              <button
                onClick={closeSlideshow}
                className="absolute top-4 right-4 text-white text-2xl"
              >
                &times;
              </button>
              <Carousel showThumbs={false}>
                {selectedGroup.map((image) => (
                  <div key={image.id}>
                    <img
                      src={image.imageUrl}
                      alt={image.groupName}
                      className="w-full h-96 object-contain"
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        )}

        {/* Upload/Update Modal */}
        {showModal && (
          <CommonModal
            showModal={showModal}
            handleClose={() => {
              setShowModal(false);
              setSelectedGroupName(null);
            }}
            title={selectedGroupName ? "Update Group Images" : "Upload Images"}
          >
            <UploadForm
              onClickBack={() => {
                setShowModal(false);
                setSelectedGroupName(null);
              }}
              onCompleted={fetchImages}
              groupName={selectedGroupName}
            />
          </CommonModal>
        )}
      </div>
    </div>
  );
};

export default Gallery;
