import { useEffect, useState } from "react";
import CheckLoggedIn from "../../utils/CheckLoggedIn";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import ConfirmDialog from "../../utils/ConfirmDialog";
import API_BASE_URL from "../../config";
import { FaTrash } from "react-icons/fa";

const User = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({ username: "", password: "" });
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await axios.get(`${API_BASE_URL}/user`, {
          withCredentials: true,
        });
        setUsers(usersRes.data);
      } catch (err) {
        setError(err.response.data.message);
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (username) => {
    const confirmed = await ConfirmDialog();
    if (!confirmed) return;
    try {
      const deleteRes = await axios.delete(`${API_BASE_URL}/user`, {
        data: { username },
        withCredentials: true,
      });
      setUsers((prev) => prev.filter((u) => u.username !== username));
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(newUser); // call your backend or add user function
    setNewUser({ username: "", password: "" });
    setShowForm(false);
  };

  const addUser = async (userData) => {
    if (!userData || !userData.username || !userData.password) return;

    const username = userData.username;
    const password = userData.password;
    try {
      const response = await axios.post(
        `${API_BASE_URL}/user`,
        {
          username, password
        },
        { withCredentials: true }
      );
      setUsers((prev) => [response.data.data, ...prev]);
    } catch (err) {
      setError(err.response.data.message);
    }
    setOpenForm(false);
  };

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
        <p className="text-red-500 text-center font-bold">{error}</p>
      </div>
    );

  return (
    <div>
      <AdminMenu />
      <div className="flex flex-col items-center w-full px-3 py-4 md:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full md:w-3/4 mb-4">
          <h2 className="text-lg font-mono font-semibold text-gray-800 mb-2 md:mb-0">
            Admin Panel
          </h2>
          <button
            className="bg-green-700 text-white px-4 py-2 text-sm rounded-md shadow-md hover:bg-green-800 transition duration-200"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "Register"}
          </button>
        </div>

        {/* Register Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-gray-100 w-full md:w-1/4 border border-gray-300 rounded-md p-4 mb-4 shadow-sm"
          >
            <div className="flex flex-col gap-3 text-sm font-mono">
              <div className="flex flex-col">
                <label className="text-gray-700">Username:</label>
                <input
                  type="text"
                  name="username"
                  value={newUser.username}
                  onChange={handleChange}
                  required
                  className="border border-gray-400 rounded-sm p-2"
                  placeholder="Enter username"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700">Password:</label>
                <input
                  type="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleChange}
                  required
                  className="border border-gray-400 rounded-sm p-2"
                  placeholder="Enter password"
                />
              </div>
              <button
                type="submit"
                className="bg-green-700 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-800 transition duration-200"
              >
                Add User
              </button>
            </div>
          </form>
        )}

        {/* Users List */}
        <div className="w-full md:w-3/4 bg-gray-50 border border-gray-200 rounded-md shadow-sm overflow-hidden">
          {users.length > 0 ? (
            users.map((user, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 border-b border-gray-200 hover:bg-gray-100 transition duration-150"
              >
                <p className="text-sm md:text-base font-mono text-gray-800">
                  {user.username}
                </p>
                <button
                  onClick={() => deleteUser(user.username)}
                  className="p-1 hover:text-red-600 transition duration-200"
                >
                  <FaTrash className="text-gray-400 size-4 md:size-5 hover:text-red-500" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 text-sm py-4">
              No users registered yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
