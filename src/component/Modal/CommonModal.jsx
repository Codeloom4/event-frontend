import React from "react";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const sizeMap = {
  sm: "xs",
  md: "sm",
  lg: "md",
  xl: "lg",
};

const CommonModal = ({ children, size = "md", title, showModal, handleClose }) => {
  return (
    <Dialog
      open={showModal}
      onClose={handleClose}
      maxWidth={sizeMap[size]}
      fullWidth
      sx={{
        backdropFilter: "blur(2px)", // Apply blur effect
        backgroundColor: "rgba(0, 0, 0, 0.1)", // Optional slight darkening
        "& .MuiPaper-root": { backgroundColor: "#1f2937", color: "white" }, // bg-gray-800 equivalent
      }}
    >
      {/* Header */}
      <DialogTitle 
        sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          fontWeight: "bold",
          color: "white" // Ensure title is visible
        }}
      >
        {title}
        <IconButton onClick={handleClose} size="small" sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Body */}
      <DialogContent sx={{ paddingTop: "20px" }}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CommonModal;
