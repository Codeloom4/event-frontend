import React, { FC } from "react";

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl", // Increased width for larger modals
};

const CommonModal = ({
  children,
  size = "md",
  title,
  showModal,
  handleClose,
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className={`bg-white rounded-lg shadow-lg p-8 ${sizeClasses[size]} w-full`}>
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button
            className="text-gray-500 hover:text-gray-700 text-2xl"
            onClick={handleClose}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="py-6">{children}</div>
      </div>
    </div>
  );
};

export default CommonModal;