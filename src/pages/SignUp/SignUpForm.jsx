import React, { useEffect, useState } from "react";
import CommonTextField from "../../component/Form/CommonTextField";
import CommonButton from "../../component/Form/CommonButton";
import UserManagementService from "../../service/UserManagementService";
import { useNavigate } from "react-router-dom";
import { displayApiMessage } from "../../context/ToastContext";
import CommonRadioGroup from "../../component/Form/CommonRadioGroup";
import { FormControlLabel, Radio } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import TableComponent from "../../component/Tables/TableComponent";
import { FaSpinner } from "react-icons/fa";

const SignUpForm = () => {
  const { authContextData } = useAuth();
  const userRole = authContextData?.userRole;
  const token = authContextData?.token;

  const [userSignUp, setUserSignUp] = useState({});
  const [error, setError] = useState("");
  const [events, setEvents] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (userRole === "ADMIN") {
      getAllUserList();
    }
  }, [userRole]);

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

      const response = await UserManagementService.signUp(
        requestData,
        userRole === "ADMIN" ? token : null
      );
      console.log("response:", response.data);

      const { responseMsg, responseCode } = response.data;

      if (responseCode === "00") {
        displayApiMessage(responseMsg);
        navigate("/login");
      } else {
        displayApiMessage(responseMsg, "warning");
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

  const handleDelete = async (id) => {
    setLoadingStates((prev) => ({ ...prev, [id]: true }));
    try {
      await UserManagementService.deleteUser(id);
      getAllUserList();
    } catch (error) {
      console.error("Failed to delete event:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
    }
  };

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
              />
              <FormControlLabel
                value="EMPLOYEE"
                control={<Radio />}
                label="Employee"
              />
              <FormControlLabel
                value="CUSTOMER"
                control={<Radio />}
                label="Customer"
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

      {/* {userRole === "ADMIN" && <TableComponent columns={[...]} data={events} />} TableComponent should have actual columns */}
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
