import { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import API_BASE_URL from "../config";

const AdminMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/login/logout`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  if (error) return <p className="text-red-500 m-10 text-center">{error}</p>;

  return (
    <nav className="relative">
      {/* Hamburger Menu Icon (only for mobile) */}
      <button
        className="md:hidden right-2 fixed top-3 text-gray-300 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Desktop Navbar */}
      <div className="hidden md:flex md:w-full  bg-green-700 text-white font-semibold font-mono p-2 justify-center gap-10">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          DASHBOARD
        </NavLink>
        <NavLink
          to="/admin/quran"
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          QURAN
        </NavLink>
        <NavLink
          to="/admin/blog"
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          BLOG
        </NavLink>
        <NavLink
          to="/admin/notice"
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          NOTICE
        </NavLink>
        <NavLink
          to="/admin/event"
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          EVENT
        </NavLink>
        <NavLink
          to="/admin/library"
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          LIBRARY
        </NavLink>
        <NavLink
          to="/admin/about"
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          ABOUT
        </NavLink>
        <NavLink
          to="/admin/donation"
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          DONATION
        </NavLink>
        <NavLink to="/" onClick={handleLogout}>
          LOGOUT
        </NavLink>
      </div>

      {/* Mobile Side Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-1/3 bg-green-800 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden z-50`}
      >
        <div className="flex justify-between items-center p-4 border-b border-green-600">
          <p className="text-lg font-bold">Menu</p>
          <button onClick={() => setIsOpen(false)}>
            <FaTimes size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-4 mt-5 ml-4 text-lg font-mono">
          <NavLink
            className={({ isActive }) =>
              isActive ? "underline" : "text-gray-300"
            }
            end
            onClick={() => setIsOpen(false)}
            to="/admin"
          >
            DASHBOARD
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "underline" : "text-gray-300"
            }
            onClick={() => setIsOpen(false)}
            to="/admin/quran"
          >
            QURAN
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "underline" : "text-gray-300"
            }
            onClick={() => setIsOpen(false)}
            to="/admin/blog"
          >
            BLOG
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "underline" : "text-gray-300"
            }
            onClick={() => setIsOpen(false)}
            to="/admin/notice"
          >
            NOTICE
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "underline" : "text-gray-300"
            }
            onClick={() => setIsOpen(false)}
            to="/admin/event"
          >
            EVENT
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "underline" : "text-gray-300"
            }
            onClick={() => setIsOpen(false)}
            to="/admin/library"
          >
            LIBRARY
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "underline" : "text-gray-300"
            }
            onClick={() => setIsOpen(false)}
            to="/admin/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "underline" : "text-gray-300"
            }
            onClick={() => setIsOpen(false)}
            to="/admin/donation"
          >
            DONATION
          </NavLink>
          <NavLink to="/" className="text-gray-300" onClick={handleLogout}>
            LOGOUT
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default AdminMenu;
