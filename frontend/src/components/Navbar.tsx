import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  //getting the token from context
  const { token, setToken, userData } = useContext(AppContext);

  const [showMenu, setShowMenu] = useState(false);

  //logout functonality
  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };
  return (
    <div className="flex items-center justify-between text-sm p-4 border-b-gray-400">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer "
        src={assets.logo}
        alt="logo"
      />
      <ul className="hidden md:flex items-start gap-5 font-medium ">
        <NavLink to="/">
          <li className="py-1">Home</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">All Doctors</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">About</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">Contact</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex items-center gap-2 coursor-pointer group relative">
            <img
              className="w-8 rounded-full"
              src={userData.image}
              alt="profilepic"
            />
            <img className="w-2.5 " src={assets.dropdown_icon} />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-primary cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="hover:text-primary cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={logout}
                  className="hover:text-primary cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white py-3 px-5 rounded-md font-light hidden md:block"
          >
            Create Account
          </button>
        )}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt="menu"
        />
        {/*  ---------------       mobile Menu       ----------------*/}
        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 bottom-0 top-0 left-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.logo} alt="logo" />
            <img
              className="w-7"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt="close_icon"
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 text-lg font-medium">
            <NavLink
              onClick={() => setShowMenu(false)}
              className="px-4 py-2 rounded inline-block hover:text-primary duration-500 transition-all"
              to="/"
            >
              <p>Home</p>
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              className="px-4 py-2 rounded inline-block hover:text-primary duration-500 transition-all"
              to="/doctors"
            >
              <p>All Doctors</p>
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              className="px-4 py-2 rounded inline-block hover:text-primary duration-500 transition-all"
              to="/about"
            >
              <p>About</p>
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              className="px-4 py-2 rounded inline-block hover:text-primary duration-500 transition-all"
              to="/contact"
            >
              <p>Contact Us</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
