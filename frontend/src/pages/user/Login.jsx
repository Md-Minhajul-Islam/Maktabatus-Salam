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
      <div className="flex flex-col items-center font-mono text-md">
        <form
          onSubmit={handleLogin}
          className="flex flex-col m-15 md:text-lg md:gap-3"
        >
          <label htmlFor="username">Username:</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded-xs md:w-md"
            type="text"
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-xs md:w-md"
            type="password"
            required
          />
          <button
            type="submit"
            className="w-20 m-3 self-center text-xs p-1 pl-3 pr-3 text-white bg-green-700 rounded-xs md:text-base md:hover:cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
