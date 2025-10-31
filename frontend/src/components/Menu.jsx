import { Link, NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <div className="w-full bg-green-700 text-white font-semibold font-mono p-1 flex justify-around text-xs md:text-base md:justify-center md:gap-20">
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
  );
};

export default Menu;
