import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faArrowRight,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import NavLogo from "../img/Navlogo.svg";
import DropdownLogo from "../img/Dropdownlogo.svg";
import "../Styles/Navbar.css";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    console.log("Token removed from local storage");

    toast.success("You have been logged out successfully!.");

    navigate("/LogIn");
  };
  const isActive = (path) => location.pathname === path;

  return (
    <div className="relative">
      <div className="flex items-center bg-white shadow-md p-4 rounded-full space-x-4 md:hidden">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
          <img src={NavLogo} alt="Logo" className="w-8 h-8" />
        </div>

        <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2 flex-1 max-w-md">
          <FontAwesomeIcon icon={faSearch} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-gray-600 placeholder-gray-400 flex-1"
          />
          <button className="ml-2">
            <FontAwesomeIcon icon={faArrowRight} className="text-gray-500" />
          </button>
        </div>

        <button onClick={toggleDropdown} className="ml-auto">
          <FontAwesomeIcon icon={faBars} className="text-gray-500 text-xl" />
        </button>
      </div>

      <div className="navvdrropdwn hidden md:flex flex-col bg-blue-500 w-64 h-screen p-4 text-white fixed top-0 left-0">
        <div className="flex items-center mb-8">
          <img src={DropdownLogo} alt="Cemperium Logo" className="mb-20" />
        </div>

        <nav className="flex-grow space-y-6">
          <Link
            to="/Home"
            className={`flex items-center p-2 mb-4  ${
              isActive("/Home")
                ? "bg-white text-blue-500 rounded-xl"
                : "text-white"
            }`}
          >
            <span className="ml-2 text-2xl">Home</span>
          </Link>
          <Link
            to="/Activity"
            className={`flex items-center p-2 mb-4 ${
              isActive("/Activity")
                ? "bg-white text-blue-500 rounded-xl"
                : "text-white"
            }`}
          >
            <span className="ml-2 text-2xl">Activity</span>
          </Link>
          <Link
            to="/Wallet"
            className={`flex items-center p-2 mb-4 ${
              isActive("/Wallet")
                ? "bg-white text-blue-500 rounded-xl"
                : "text-white"
            }`}
          >
            <span className="ml-2 text-2xl">Wallet</span>
          </Link>
          <Link
            to="/Cryptocurrency"
            className={`flex items-center p-2 mb-4 ${
              isActive("/Cryptocurrency")
                ? "bg-white text-blue-500 rounded-xl"
                : "text-white"
            }`}
          >
            <span className="ml-2 text-2xl">Cryptocurrency</span>
          </Link>
          <a href="#settings" className="flex items-center p-2 text-white">
            <span className="ml-2 text-2xl">Settings</span>
          </a>
        </nav>

        <div>
          <Link onClick={handleLogout}>
            <a href="#logout" className="flex items-center p-2 text-white">
              <span className="ml-2 text-2xl">Log Out</span>
            </a>
          </Link>
        </div>
      </div>

      {isOpen && (
        <>
          <div
            className={`fixed top-0 left-0 h-full w-full bg-white transform ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out z-50 md:hidden`}
          >
            {/* Close Icon */}
            <button
              onClick={toggleDropdown}
              className="absolute top-4 right-4 text-gray-500 text-2xl"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            <nav className="navvdrropdwn flex flex-col h-full p-8 space-y-6">
              <img src={DropdownLogo} alt="" className="mb-20" />
              <Link
                to="/Home"
                className={`flex items-center p-2 mb-4 ${
                  isActive("/Home")
                    ? "bg-white text-blue-500 rounded-xl"
                    : "text-white"
                }`}
              >
                <span className="text-2xl">Home</span>
              </Link>
              <Link
                to="/Activity"
                className={`flex items-center p-2 mb-4 ${
                  isActive("/Activity")
                    ? "bg-white text-blue-500 rounded-xl"
                    : "text-white"
                }`}
              >
                <span className="text-2xl">Activity</span>
              </Link>
              <Link
                to="/Wallet"
                className={`flex items-center p-2 mb-4 ${
                  isActive("/Wallet")
                    ? "bg-white text-blue-500 rounded-xl"
                    : "text-white"
                }`}
              >
                <span className="text-2xl">Wallet</span>
              </Link>
              <Link
                to="/Cryptocurrency"
                className={`flex items-center p-2 mb-4 ${
                  isActive("/Cryptocurrency")
                    ? "bg-white text-blue-500 rounded-xl"
                    : "text-white"
                }`}
              >
                <span className="text-2xl">Cryptocurrency</span>
              </Link>
              <Link
                to=""
                className={`flex items-center p-2 mb-4 ${
                  isActive("/Settings")
                    ? "bg-white text-blue-500 rounded-xl"
                    : "text-white"
                }`}
              >
                <span className="text-2xl">Settings</span>
              </Link>
             
              <div className="flex-grow"></div>
              <Link onClick={handleLogout}>
                <a
                  href="#logout"
                  className="text-slate-100 text-2xl hover:text-red-700 p-2 mb-8"
                >
                  Logout
                </a>
              </Link>
            </nav>
          </div>

          <div
            onClick={toggleDropdown}
            className="fixed inset-0 bg-black opacity-50 z-40"
          ></div>
        </>
      )}
    </div>
  );
};

export default Navbar;
