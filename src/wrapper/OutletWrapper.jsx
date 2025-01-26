import { Outlet, useLocation, Navigate } from "react-router-dom";
import Header from "../component/Header/Header"; // Import your Header component
import Footer from "../component/Footer/Footer"; // Import your Footer component
import { useAuth } from "../context/AuthContext"; // Import your authentication context

const OutletWrapper = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth(); // Use your authentication context

  // Define routes where Header and Footer should not be shown
  const noHeaderFooterRoutes = ["/LogIn" /*, "/SignUp" */];

  // Check if the current route is in the noHeaderFooterRoutes array
  const shouldShowHeaderFooter = !noHeaderFooterRoutes.includes(
    location.pathname
  );

  // If the user is not authenticated and tries to access protected routes, redirect to LogIn
  if (!isAuthenticated && !noHeaderFooterRoutes.includes(location.pathname)) {
    return <Navigate to="/LogIn" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Conditionally render Header */}
      {shouldShowHeaderFooter && <Header />}

      {/* Main Content with Padding for Fixed Header */}
      <main className="flex-grow pt-24 p-4">
        <Outlet /> {/* This renders the nested routes */}
      </main>

      {/* Conditionally render Footer */}
      {shouldShowHeaderFooter && <Footer />}
    </div>
  );
};

export default OutletWrapper;
