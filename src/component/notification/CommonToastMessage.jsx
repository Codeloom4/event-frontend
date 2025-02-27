import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide, Bounce, Zoom, Flip } from "react-toastify";

const ALERT_SUCCESS = "success";
const ALERT_WARNING = "warning";
const ALERT_ERROR = "error";

const selectTransition = (alertTransition) => {
  switch (alertTransition) {
    case "Slide":
      return Slide;
    case "Zoom":
      return Zoom;
    case "Flip":
      return Flip;
    case "Bounce":
      return Bounce;
    default:
      return undefined;
  }
};

const showToast = (type, message, position, autoClose, transition) => {
  switch (type) {
    case ALERT_SUCCESS:
      toast.success(message, {
        position,
        autoClose,
        transition: selectTransition(transition),
      });
      break;
    case ALERT_WARNING:
      toast.warning(message, {
        position,
        autoClose,
        transition: selectTransition(transition),
      });
      break;
    case ALERT_ERROR:
      toast.error(message, {
        position,
        autoClose,
        transition: selectTransition(transition),
      });
      break;
    default:
      toast(message, {
        position,
        autoClose,
        transition: selectTransition(transition),
      });
  }
};

const CommonToastMessage = ({
  message,
  type = ALERT_SUCCESS,
  position = "top-right",
  autoClose = 3000,
  transition = "Slide",
  hideProgressBar = false,
  newestOnTop = false,
  closeOnClick = true,
  rtl = false,
  pauseOnFocusLoss = true,
  draggable = true,
  pauseOnHover = true,
  theme = "colored",
}) => {
  useEffect(() => {
    if (message) {
      showToast(type, message, position, autoClose, transition);
    }
  }, [message, type]); 

  console.log("CommonToastMessage -> message", message);

  return (
    <ToastContainer
      {...{
        position,
        autoClose,
        hideProgressBar,
        newestOnTop,
        closeOnClick,
        rtl,
        pauseOnFocusLoss,
        draggable,
        pauseOnHover,
        theme,
      }}
    />
  );
};

export default CommonToastMessage;
