import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import CheckLoggedIn from "../../utils/CheckLoggedIn";

const Dashboard = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoggedInStatus = async () => {
      const status = await CheckLoggedIn();
      setLoggedIn(status);
      setLoading(false);
    };
    fetchLoggedInStatus();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/login/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      setLoggedIn(false);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-green-800 font-bold">
        Please wait...
      </p>
    );

  if (!loggedIn)
    return (
      <p className="text-red-500 text-lg font-bold text-center m-5">
        Unauthorized!
      </p>
    );

  return (
    <div className="grid grid-cols-2 pt-15 p-5 gap-6">
      <NavLink
        className=" mt-2 absolute right-2 md:right-1/10 text-xs bg-red-700 text-white rounded-sm pl-2 pr-2 p-0.5 shadow shadow-xs- shadow-red-950 hover:cursor-pointer"
        onClick={handleLogout}
        to="/"
      >
        Logout
      </NavLink>
      <Link className="bg-gray-800 text-white h-30 rounded-2xl flex justify-center items-center text-xl">
        Quran
      </Link>
      <Link className="bg-blue-800 text-white h-30 rounded-2xl flex justify-center items-center text-xl">
        Blogs
      </Link>
      <Link className="bg-cyan-800 text-white h-30 rounded-2xl flex justify-center items-center text-xl">
        Notice
      </Link>
      <Link className="bg-teal-800 text-white h-30 rounded-2xl flex justify-center items-center text-xl">
        Events
      </Link>
    </div>
  );
};

export default Dashboard;
