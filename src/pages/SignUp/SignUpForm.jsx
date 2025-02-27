import React, { useEffect, useState } from "react";
import CommonTextField from "../../component/Form/CommonTextField";
import CommonButton from "../../component/Form/CommonButton";
import UserManagementService from "../../service/UserManagementService";
import { useNavigate } from "react-router-dom";
import { displayApiMessage } from "../../context/ToastContext";
import CommonRadioGroup from "../../component/Form/CommonRadioGroup";
import { FormControlLabel, Radio } from "@mui/material";
import { useAuth } from "../../context/AuthContext"; // Import useAuth to get user role
import TableComponent from "../../component/Tables/TableComponent";
import { FaSpinner } from "react-icons/fa";

const SignUpForm = () => {
  const { authContextData } = useAuth();
  const userRole = authContextData?.userRole; // Get the logged-in user's role

  const [userSignUp, setUserSignUp] = useState({});
  const [error, setError] = useState("");
  const [events, setEvents] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    getAllUserList();
  }, []);

  const formOnChange = (e) => {
    const { name, value, type } = e.target;
    setUserSignUp((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const onClickAdd = async () => {
    try {
      const requestData = {
        ...userSignUp,
        enabled: true,
        position: userRole === "ADMIN" ? userSignUp.position : "CLIENT",
        role: userRole === "ADMIN" ? userSignUp.role : "CLIENT",
        roles: [userRole === "ADMIN" ? userSignUp.role : "CLIENT"],
      };

      const response = await UserManagementService.signUp(requestData);
      console.log("response:", response.data);

      const { responseMsg, responseCode } = response.data;

      if (responseCode === "00") {
        displayApiMessage(responseMsg);
        navigate("/login");
      } else if (responseCode === "01") {
        displayApiMessage(responseMsg, "warning");
      } else {
        setError("Sign-up failed. Please try again.");
      }
    } catch (err) {
      setError("Sign-up failed. Please try again.");
      console.error("Sign-up error:", err);
    }
  };

  const getAllUserList = async () => {
    try {
      const response = await UserManagementService.getUserList();
      if (response.data.responseCode === "00") {
        setEvents(response.data.content);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  // Delete Event
  const handleDelete = async (id) => {
    setLoadingStates((prev) => ({ ...prev, [id]: true })); // Set loading state for this item
    try {
      await UserManagementService.deleteUser(id);
      getAllUserList(); // Refresh the event list
    } catch (error) {
      console.error("Failed to delete event:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false })); // Reset loading state for this item
    }
  };

  const columns = [
    { Header: "UserName", accessor: "username" },
    { Header: "Email", accessor: "email" },
    { Header: "Position", accessor: "position" },
    { Header: "Mobile No.", accessor: "mobileNo" },
    {
      Header: "Role",
      accessor: (row) => row.roles.map((role) => role.name).join(", "),
    },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => {
        const id = row.original.id;
        const isLoading = loadingStates[id] || false; // Get loading state for this item

        return (
          <div className="flex space-x-2">
            {/* <button
              onClick={() => openModal(row.original)}
              className="px-3 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Edit
            </button> */}
            <button
              onClick={() => handleDelete(id)}
              className="px-3 py-1 text-white bg-red-500 rounded-md hover:bg-red-600 disabled:bg-red-300"
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? (
                <FaSpinner className="animate-spin" /> // Show spinner
              ) : (
                "Delete"
              )}
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <form className="w-full max-md min-sm">
      <div className="mb-4 flex flex-col gap-4">
        <CommonTextField
          id="username"
          name="username"
          label="Username"
          value={userSignUp.username || ""}
          onChange={formOnChange}
        />

        <CommonTextField
          id="email"
          name="email"
          label="Email Address"
          type="email"
          value={userSignUp.email || ""}
          onChange={formOnChange}
        />

        <CommonTextField
          id="password"
          name="password"
          label="Password"
          type="password"
          value={userSignUp.password || ""}
          onChange={formOnChange}
        />

        {userRole === "ADMIN" && (
          <>
            <CommonTextField
              id="position"
              name="position"
              label="Position"
              value={userSignUp.position || ""}
              onChange={formOnChange}
            />

            <CommonRadioGroup
              name="role"
              label="Role"
              row
              value={userSignUp.role || ""}
              onChange={formOnChange}
            >
              <FormControlLabel
                value="ADMIN"
                control={<Radio />}
                label="Administration"
                className="text-gray-500 text"
              />
              <FormControlLabel
                value="EMPLOYEE"
                control={<Radio />}
                label="Employee"
                className="text-gray-500 text"
              />
              <FormControlLabel
                value="CUSTOMER"
                control={<Radio />}
                label="Customer"
                className="text-gray-500 text"
              />
            </CommonRadioGroup>
          </>
        )}

        <CommonTextField
          id="mobileNo"
          name="mobileNo"
          label="Mobile Number"
          value={userSignUp.mobileNo || ""}
          onChange={formOnChange}
        />

        <CommonTextField
          id="address"
          name="address"
          label="Address"
          value={userSignUp.address || ""}
          onChange={formOnChange}
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm text-center mb-4">{error}</p>
      )}

      <div className="w-full">
        <CommonButton
          type="button"
          label="Sign Up"
          onClick={onClickAdd}
          className="w-full"
        />
      </div>

      {userRole === "ADMIN" && (
        <div className="overflow-x-auto">
          <TableComponent columns={columns} data={events} />
        </div>
      )}

      {userRole !== "ADMIN" && (
        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:text-blue-700">
            Log in
          </a>
        </p>
      )}
    </form>
  );
};

export default SignUpForm;
