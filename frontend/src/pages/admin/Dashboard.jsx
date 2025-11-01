import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import CheckLoggedIn from "../../utils/CheckLoggedIn";
import AdminMenu from "../../components/AdminMenu";

const Dashboard = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoggedInStatus = async () => {
      const status = await CheckLoggedIn();
      setLoggedIn(status);
      setLoading(false);
    };
    fetchLoggedInStatus();
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
      Hello
    </div>
  );
};

export default Dashboard;
