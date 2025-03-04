import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { USER_ROLES } from "./utils/constants";
import { ToastProvider } from "./context/ToastContext";

import Dashboard from "./pages/Dashboard/Dashboard";
import Header from "./component/Header/Header";
import SubHeader from "./component/Header/SubHeader";
import Footer from "./component/Footer/Footer";
import Home from "./pages/Home/Home";
import LogIn from "./pages/LogIn/LogIn";
import Inventory from "./pages/Inventory/Inventory";
import Item from "./pages/Item/Item";
import Events from "./pages/EventManagement/CreateEvent";
import CreateEvent from "./pages/EventManagement/CreateEvent";
import SignUp from "./pages/SignUp/SignUp";
import Profile from "./pages/Profile/Profile";
import Service from "./pages/Services/Services";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Gallery from "./pages/Gallery/Gallery";
import TransportCostManagement from "./pages/TransportCostManagement/TransportCostManagement";
import SystemUserStatus from "./pages/Reports/SystemUserStatus";
import InventoryStockReport from "./pages/Reports/InventoryStockReport";
import LowStockReport from "./pages/Reports/LowStockReport";
import SalesRevenueReport from "./pages/Reports/SalesRevenueReport";
import ResetPassword from "./pages/LogIn/ResetPassword";
import Package from "./pages/Package/Package";

// PrivateRoute component to protect authenticated routes
const PrivateRoute = ({ children, allowedRoles }) => {
  const { authContextData } = useAuth();
  const { isAuthenticated, userRole } = authContextData;

  if (!isAuthenticated) {
    return <Navigate to="/LogIn" />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/Unauthorized" />;
  }

  return children;
};

// PublicRoute component to redirect authenticated users away from LogIn/signup
const PublicRoute = ({ children }) => {
  const { authContextData } = useAuth();
  const { isAuthenticated } = authContextData;

  return isAuthenticated ? <Navigate to="/" /> : children;
};

// Layout component to conditionally render Header, SubHeader, and Footer
const Layout = ({ children }) => {
  const location = useLocation();
  const { authContextData } = useAuth();
  const { isAuthenticated, userRole } = authContextData;

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/reset-password";

  const showSubHeader =
    isAuthenticated &&
    (userRole === USER_ROLES.ADMIN || userRole === USER_ROLES.EMPLOYEE);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Conditionally render Header and SubHeader */}
      {!isAuthPage && <Header />}
      {!isAuthPage && showSubHeader && <SubHeader />}

      {/* Main Content with Padding for Fixed Header */}
      <main className={`flex-grow ${!isAuthPage ? "pt-16 py-4 mt-32 px-24" : ""}`}>
        {children}
      </main>

      {/* Conditionally render Footer */}
      {!isAuthPage && <Footer />}
    </div>
  );
};

// HomePageWrapper component (to handle redirection after login)
const HomePageWrapper = () => {
  const { authContextData } = useAuth();
  const { isAuthenticated, userRole } = authContextData;

  // If the user is authenticated and is an ADMIN or EMPLOYEE, redirect to the Dashboard
  if (
    isAuthenticated &&
    [USER_ROLES.ADMIN, USER_ROLES.EMPLOYEE].includes(userRole)
  ) {
    return <Navigate to="/dashboard" />;
  }
  return <Home />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>

          <ToastProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePageWrapper />} />
              <Route path="/services/:serviceId" element={<Service />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/gallery" element={<Gallery />} />
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
                path="/reset-password"
                element={
                  <PublicRoute>
                    <ResetPassword />
                  </PublicRoute>
                }
              />


              {/* Protected Routes */}
              {/* ----------------------------------------Common---------------------------------------- */}
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/package/:packageId"
                element={
                  <PrivateRoute>
                    <Package />
                  </PrivateRoute>
                }
              />
              
              {/* ----------------------------------------Admin/Employee---------------------------------------- */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute
                    allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.EMPLOYEE]}
                  >
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/event-management"
                element={
                  <PrivateRoute
                    allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.EMPLOYEE]}
                  >
                    <CreateEvent />
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
              <Route
                path="/item-management"
                element={
                  <PrivateRoute
                    allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.EMPLOYEE]}
                  >
                    <Item />
                  </PrivateRoute>
                }
              />
              <Route
                path="/transport-management"
                element={
                  <PrivateRoute
                    allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.EMPLOYEE]}
                  >
                    <TransportCostManagement />
                  </PrivateRoute>
                }
              />

              {/* ----------------------------------------Reports---------------------------------------- */}
              <Route
                path="/system-user-status"
                element={
                  <PrivateRoute
                    allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.EMPLOYEE]}
                  >
                    <SystemUserStatus />
                  </PrivateRoute>
                }
              />
              <Route
                path="/inventory-stock-report"
                element={
                  <PrivateRoute
                    allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.EMPLOYEE]}
                  >
                    <InventoryStockReport />
                  </PrivateRoute>
                }
              />
              <Route
                path="/low-stock-report"
                element={
                  <PrivateRoute
                    allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.EMPLOYEE]}
                  >
                    <LowStockReport />
                  </PrivateRoute>
                }
              />
              <Route
                path="/sales-revenue-report"
                element={
                  <PrivateRoute
                    allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.EMPLOYEE]}
                  >
                    <SalesRevenueReport />
                  </PrivateRoute>
                }
              />

              {/* ----------------------------------------404 Route---------------------------------------- */}
              <Route
                path="*"
                element={
                  <h1 className="mt-10 text-2xl text-center">
                    404 - Page Not Found
                  </h1>
                }
              />
              {/* ----------------------------------------Unauthorized Route---------------------------------------- */}
              <Route
                path="/unauthorized"
                element={
                  <h1 className="mt-10 text-2xl text-center">
                    Unauthorized - Access Denied
                  </h1>
                }
              />
            </Routes>
          </ToastProvider>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
