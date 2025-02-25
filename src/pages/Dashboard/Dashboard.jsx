import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ApiManager from "../../service/Api/ApiManager";
import {
  BarChart,
  PieChart,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Pie,
  Line,
} from "recharts";
import { FaSpinner } from "react-icons/fa"; // Import spinner icon

const Dashboard = () => {
  const { authContextData } = useAuth();
  const [systemSummary, setSystemSummary] = useState({
    userSummary: [],
    stockSummary: [],
    revenueSummary: [],
  });
  const [loading, setLoading] = useState(true); // Add loading state

  // Fetch dashboard data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Fetch data for charts
  const fetchDashboardData = async () => {
    try {
      const userSummaryResponse = await ApiManager.apiGet("/ems/dashboard/user-summary");
      const stockSummaryResponse = await ApiManager.apiGet("/ems/dashboard/stock-summary");
      const revenueSummaryResponse = await ApiManager.apiGet("/ems/dashboard/revenue-summary");

      setSystemSummary({
        userSummary: userSummaryResponse.data,
        stockSummary: stockSummaryResponse.data,
        revenueSummary: revenueSummaryResponse.data,
      });
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false); // Stop loading after data is fetched
    }
  };

  // Show spinner while loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Dashboard
        </h1>

        {/* User Summary Chart */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">System Users Summary</h2>
          <BarChart
            width={600}
            height={300}
            data={systemSummary.userSummary}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="role" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </div>

        {/* Stock Summary Chart */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Stock Summary</h2>
          <PieChart width={400} height={400}>
            <Pie
              data={systemSummary.stockSummary}
              dataKey="quantity"
              nameKey="item_name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#82ca9d"
              label
            />
            <Tooltip />
          </PieChart>
        </div>

        {/* Revenue Summary Chart */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Revenue Summary</h2>
          <LineChart
            width={600}
            height={300}
            data={systemSummary.revenueSummary}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#ff7300" />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;