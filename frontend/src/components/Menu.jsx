import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="">
      {/* Mobile Menu Icon */}
      <button
        className="md:hidden right-2 fixed top-3.5 text-gray-400 z-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Desktop Navbar */}
      <div className="hidden md:flex md:w-full  bg-green-700 text-white font-semibold font-mono p-2 justify-center gap-10">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          HOME
        </NavLink>
        <NavLink
          to="/notice"
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          NOTICE
        </NavLink>
        <NavLink
          to="/event"
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          EVENT
        </NavLink>
        <NavLink
          to="/library"
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          LIBRARY
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          ABOUT
        </NavLink>
        <NavLink
          to="/donation"
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          DONATE
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          LOGIN
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
            onClick={() => setIsOpen(false)}
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "underline" : "text-gray-300"
            }
            onClick={() => setIsOpen(false)}
            to="/notice"
          >
            NOTICE
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "underline" : "text-gray-300"
            }
            onClick={() => setIsOpen(false)}
            to="/event"
          >
            EVENT
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "underline" : "text-gray-300"
            }
            onClick={() => setIsOpen(false)}
            to="/library"
          >
            LIBRARY
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "underline" : "text-gray-300"
            }
            onClick={() => setIsOpen(false)}
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "underline" : "text-gray-300"
            }
            onClick={() => setIsOpen(false)}
            to="/donation"
          >
            DONATE
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "underline" : "text-gray-300"
            }
            onClick={() => setIsOpen(false)}
            to="/login"
          >
            LOGIN
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
