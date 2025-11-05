import { useState } from "react";
import axios from "axios";
import Menu from "../../components/Menu";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../config";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/login`,
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      setUsername("");
      setPassword("");
      navigate("/admin");
    } catch (err) {
      setError(err.response.data.message || "Login Failed!");
    }
  };

  if (error)
    return (
      <div>
        <Menu />
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );

  return (
    <div>
      <Menu />
      <div className="flex flex-col items-center justify-center bg-gray-50 px-4">
        <form
          onSubmit={handleLogin}
          className="mt-20 w-full max-w-md bg-white p-8 rounded-xl shadow-md space-y-4 md:space-y-6"
        >
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="mb-1 font-medium text-gray-700"
            >
              Username
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              required
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="mb-1 font-medium text-gray-700"
            >
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-700 text-white font-semibold rounded-lg py-2 mt-2 hover:bg-green-800 transition-transform hover:scale-105"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
