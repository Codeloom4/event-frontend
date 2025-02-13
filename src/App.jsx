import React from "react";
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
import SignUp from "./pages/SignUp/SignUp";
// import Events from "./pages/Events/Events";
import Profile from "./pages/Profile/Profile";
import { AuthProvider, useAuth } from "./context/AuthContext";

// PrivateRoute component to protect authenticated routes
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/LogIn" />;
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
      <main className={`flex-grow ${!isAuthPage ? "pt-16 py-4" : ""}`}>
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

                {/* Protected Routes */}
                {/* <Route
              path="/events"
              element={
                <PrivateRoute>
                  <Events />
                </PrivateRoute>
              }
            />*/}
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />

                <Route path="/inventory" element={<Inventory />} />

                <Route
                  path="/inventory"
                  element={
                    <PrivateRoute>
                      <Inventory />
                    </PrivateRoute>
                  }
                />

                {/* 404 Route */}
                <Route
                  path="*"
                  element={
                    <h1 className="text-center text-2xl mt-10">
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
