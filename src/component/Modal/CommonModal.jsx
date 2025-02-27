import React, { FC, ReactNode } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material";
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
      }}
    >
      {/* Header */}
      <DialogTitle 
        sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          fontWeight: "bold" // Make title bold
        }}
      >
        {title}
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Body */}
      <DialogContent style={{ paddingTop: '20px'}}>{children}</DialogContent>
    </Dialog>
  );
};

export default CommonModal;
