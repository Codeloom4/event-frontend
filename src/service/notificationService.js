import { enqueueSnackbar } from "notistack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";

// Define notification types with colors & icons
const notificationTypes = {
  "00": { variant: "success", icon: <CheckCircleIcon />, color: "green" },
  "01": { variant: "error", icon: <ErrorIcon />, color: "red" },
  "03": { variant: "warning", icon: <WarningIcon />, color: "orange" },
};

// Function to show a notification
export const showNotification = (type, message) => {
  const notif = notificationTypes[type] || notificationTypes["03"]; // Default to warning

  enqueueSnackbar(
    <span className="flex items-center gap-2">
      {notif.icon} {message}
    </span>,
    { variant: notif.variant }
  );
};
