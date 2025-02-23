import React, { createContext, useContext, useState, useRef } from "react";
import CommonToastMessage from "../component/notification/CommonToastMessage";

const ToastContext = createContext();

let displayApiMessageFunction = () => {}; // Placeholder function

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [typeOfMessage, setTypeOfMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const lastMessageRef = useRef(""); // Store last displayed message
  const isToastActive = useRef(false); // Track if a toast is already visible

  const displayApiMessage = (msg, type = "success", callback = null) => {
    if (isToastActive.current || msg === lastMessageRef.current) {
      return; // Prevent duplicate toasts
    }

    lastMessageRef.current = msg; // Store last message
    isToastActive.current = true; // Mark toast as active
    setMessage(msg);
    setTypeOfMessage(type);
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
      isToastActive.current = false; // Reset toast status
      lastMessageRef.current = ""; // Reset message after hiding

      if (callback) callback(); // Execute callback (e.g., navigate)
    }, 3000); // Toast disappears after 3s
  };

  displayApiMessageFunction = displayApiMessage;

  return (
    <ToastContext.Provider value={{ displayApiMessage }}>
      {children}
      {isVisible && (
        <CommonToastMessage message={message} type={typeOfMessage} />
      )}
    </ToastContext.Provider>
  );
};

// Global function to prevent duplicate calls
export const displayApiMessage = (msg, type = "success", callback = null) => {
  displayApiMessageFunction(msg, type, callback);
};
