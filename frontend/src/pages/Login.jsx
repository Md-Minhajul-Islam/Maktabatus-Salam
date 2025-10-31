// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import API_BASE_URL from "../config";

// export default function () {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//          `${API_BASE_URL}/login`,
//         {
//           username,
//           password,
//         },
//         { withCredentials: true }
//       );
//       setUsername("");
//       setPassword("");
//       navigate("/");
//     } catch (err) {
//       setError(err.response.data.message || "Login Failed!");
//     }
//   };

//   const handleLogout = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/login/logout`,
//         {},
//         {
//           withCredentials: true,
//         }
//       );
//       setUsername("");
//       setPassword("");
//       navigate("/");
//     } catch (err) {
//       setError(err.response.data.message);
//     }
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/login/register`,
//         {
//           username,
//           password,
//         },
//         {
//           withCredentials: true,
//         }
//       );
//       setUsername("");
//       setPassword("");
//       navigate("/");
//     } catch (err) {
//       setError(err.response.data.message);
//     }
//   };

//   if (error) return <p className="text-red-500 text-center">{error}</p>;

//   return (
//     <div className="flex flex-col items-center font-mono text-md">
//       <button
//         onClick={handleLogout}
//         className="right-3 absolute text-xs m-2 rounded-xs bg-red-700 pl-1 pb-0.5 pr-1 text-white md:text-base md:hover:cursor-pointer md:right-1/17"
//       >
//         Logout
//       </button>
//       <form className="flex flex-col m-15 md:text-lg md:gap-3">
//         <label htmlFor="username">Username:</label>
//         <input
//           onChange={(e) => setUsername(e.target.value)}
//           className="border rounded-xs md:w-lg"
//           type="text"
//           required
//         />
//         <label htmlFor="password">Password:</label>
//         <input
//           onChange={(e) => setPassword(e.target.value)}
//           className="border rounded-xs"
//           type="password"
//           required
//         />
//         <div className="flex justify-center m-3 gap-2">
//           <button
//             onClick={handleLogin}
//             className="text-xs pl-3 pr-3 text-white bg-green-700 rounded-xs md:text-base md:hover:cursor-pointer"
//           >
//             Login
//           </button>
//           <button
//             onClick={handleRegister}
//             className="pl-1 pr-1 text-xs text-white bg-sky-700 rounded-xs md:text-base md:hover:cursor-pointer"
//           >
//             Register
//           </button>
//         </div>
//         <span className="text-red-500 text-xs font-sans">
//           *Only Admins can register new users.
//         </span>
//       </form>
//     </div>
//   );
// }
