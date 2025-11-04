import { useEffect, useState } from "react";
import API_BASE_URL from "../../config";
import axios from "axios";
import CheckLoggedIn from "../../utils/CheckLoggedIn";
import AdminMenu from "../../components/AdminMenu";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([
    { name: "Blogs", value: 0 },
    { name: "Notices", value: 0 },
    { name: "Events", value: 0 },
    { name: "Books", value: 0 },
  ]);

  useEffect(() => {
    const fetchLoggedInStatus = async () => {
      const status = await CheckLoggedIn();
      setLoggedIn(status);
      setLoading(false);
    };
    fetchLoggedInStatus();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/dashboard`,
          {
            withCredentials: true,
          }
        );
        setData([
          { name: "Blogs", value: response.data.blogs },
          { name: "Notices", value: response.data.notices },
          { name: "Events", value: response.data.events },
          { name: "Books", value: response.data.books },
        ]);
      } catch (err) {
        setError(err.response.data.message);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div>
        <AdminMenu />
        <p className="text-center mt-10 text-green-800 font-bold">
          Please wait...
        </p>
      </div>
    );

  if (!loggedIn)
    return (
      <div>
        <AdminMenu />
        <p className="text-red-500 text-lg font-bold text-center m-5">
          Unauthorized!
        </p>
      </div>
    );

  if (error)
    return (
      <div>
        <AdminMenu />
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );

  return (
    <div>
      <AdminMenu />
      <div className="w-full flex flex-col items-center px-4 py-6 md:px-10">
        <p className="text-xl font-mono font-bold text-gray-800 mb-6 text-center">
          OVERVIEW
        </p>
        {/* Bar Chart */}
        <div className="w-full md:w-2/4 bg-white border border-gray-200 rounded-md p-4 shadow-sm">
          <p className="text-base font-semibold md:text-lg font-mono text-gray-700 mb-3">
            Content Distribution
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{ left: -25}}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis className="text-xs md:text-base" dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#15803d" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
