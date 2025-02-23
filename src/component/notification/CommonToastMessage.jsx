// import React from "react";
// import { ToastContainer, toast } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";

// const CommonToastMessage = ({
//   message,
//   type = "success", // Default type
//   position = "top-right",
//   autoClose = 5000,
//   hideProgressBar = false,
//   newestOnTop = false,
//   closeOnClick = true,
//   rtl = false,
//   pauseOnFocusLoss = true,
//   draggable = true,
//   pauseOnHover = true,
//   theme = "colored",
// }) => {
//   const showToast = () => {
//     switch (type) {
//       case "success":
//         toast.success(message);
//         break;
//       case "error":
//         toast.error(message);
//         break;
//       case "warn":
//         toast.warn(message);
//         break;
//       case "info":
//         toast.info(message);
//         break;
//       default:
//         toast(message);
//     }
//   };

//   return (
//     <>
//       <button
//         onClick={showToast}
//         style={{ padding: "10px", cursor: "pointer" }}
//       >
//         Show Toast
//       </button>
//       <ToastContainer
//         position={position}
//         autoClose={autoClose}
//         hideProgressBar={hideProgressBar}
//         newestOnTop={newestOnTop}
//         closeOnClick={closeOnClick}
//         rtl={rtl}
//         pauseOnFocusLoss={pauseOnFocusLoss}
//         draggable={draggable}
//         pauseOnHover={pauseOnHover}
//         theme={theme}
//       />
//     </>
//   );
// };

// export default CommonToastMessage;
