import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <div className="p-1.5 flex justify-center items-center bg-green-800 text-white">
        <img
          className="w-7 rounded-full object-cover border-1 border-white-800 md:w-11"
          src="/images/logo.png"
          alt="Logo"
        />
        <p className="ml-1 text-3xl font-bold font-mono md:text-5xl">MAKTABATUS SALAM</p>
      </div>
      <div className="bg-green-700 text-white font-semibold font-mono p-1 flex justify-around text-xs md:text-base md:justify-center md:gap-20">
        <NavLink
          className={({ isActive }) =>
            isActive ? "border-b-1 border-white" : ""
          }
          to="/"
        >
          HOME
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "border-b-1 border-white" : ""
          }
          to="/notice"
        >
          NOTICE
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "border-b-1 border-white" : ""
          }
          to="/event"
        >
          EVENT
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "border-b-1 border-white" : ""
          }
          to="/library"
        >
          LIBRARY
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "border-b-1 border-white" : ""
          }
          to="/about"
        >
          ABOUT
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "border-b-1 border-white" : ""
          }
          to="/login"
        >
          LOGIN
        </NavLink>
      </div>
    </nav>
  );
}
