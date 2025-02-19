import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import Home from "./pages/Home/Home";
import LogIn from "./pages/LogIn/LogIn";
import Inventory from "./pages/Inventory/Inventory";
import Events from "./pages/EventManagement/Events";
import SignUp from "./pages/SignUp/SignUp";
import Profile from "./pages/Profile/Profile";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { USER_ROLES } from "./utils/constants";

// PrivateRoute component to protect authenticated routes
const PrivateRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, userrole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/LogIn" />;
  }

  if (allowedRoles && !allowedRoles.includes(userrole.userrole)) {
    return <Navigate to="/Unauthorized" />;
  }

  return children;
};

// PublicRoute component to redirect authenticated users away from LogIn/signup
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" /> : children;
};

// Layout component to conditionally render Header and Footer
const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="flex flex-col min-h-screen mt-6">
      {/* Conditionally render Header */}
      {!isAuthPage && <Header />}

      {/* Main Content with Padding for Fixed Header */}
      <main className={`flex-grow ${!isAuthPage ? "pt-16 py-4 mt-14" : ""}`}>
        {children}
      </main>

      {/* Conditionally render Footer */}
      {!isAuthPage && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <div>
            <main>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route
                  path="/LogIn"
                  element={
                    <PublicRoute>
                      <LogIn />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <PublicRoute>
                      <SignUp />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/services/:serviceId"
                  element={
                    <PublicRoute>
                      {/* <Service /> */}
                    </PublicRoute>
                  }
                />

                {/* Protected Routes */}
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/event-management"
                  element={
                    <PrivateRoute
                      allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.EMPLOYEE]}
                    >
                      <Events />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/inventory-management"
                  element={
                    <PrivateRoute
                      allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.EMPLOYEE]}
                    >
                      <Inventory />
                    </PrivateRoute>
                  }
                />

                {/* 404 Route */}
                <Route
                  path="*"
                  element={
                    <h1 className="mt-10 text-2xl text-center">
                      404 - Page Not Found
                    </h1>
                  }
                />
              </Routes>
            </main>
          </div>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
