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
import CemperiumLogo from "../img/Logo.svg";
import "../Styles/Navbar.css";
import BnbPriceChart from "./BnbPriceChart";
import SearchBar from "./SearchBar";
import SolanaPriceChart from "./SolanaPriceChart";
import EthPriceChart from "./EthPriceChart";
import BitcoinChart from "./BitcoinChart";
import CryptocurrenciesList from "../Components/CryptocurrenciesList";
import WalletBalance from "./WalletBalance";
import CryptoAssets from "./CryptoAssets";
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
      {/* Small Screen Navbar (Visible only on small screens) */}
      <div className="flex items-center bg-white shadow-md p-4 rounded-full space-x-4 md:hidden">
        {/* Logo */}
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
          <img src={NavLogo} alt="Logo" className="w-8 h-8" />
        </div>

        {/* Search Bar */}
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

        {/* Hamburger Menu */}
        <button onClick={toggleDropdown} className="ml-auto">
          <FontAwesomeIcon icon={faBars} className="text-gray-500 text-xl" />
        </button>
      </div>

      {/* Sidebar for Medium and Large Screens (Visible only on md and larger screens) */}
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
            <span className="ml-2 text-2xl">Hooime</span>
          </Link>
          <Link
            to="/Activity"
            className={`flex items-center p-2 mb-4 ${
              isActive("/Activity") ? "bg-white text-blue-500 rounded-xl" : "text-white"
            }`}
          >
            <span className="ml-2 text-2xl">Activity</span>
          </Link>
          <Link
            to="/Wallet"
            className={`flex items-center p-2 mb-4 ${
              isActive("/Wallet") ? "bg-white text-blue-500 rounded-xl" : "text-white"
            }`}
          >
            <span className="ml-2 text-2xl">Wallet</span>
          </Link>
          <a
            href="#cryptocurrency"
            className="flex items-center p-2 mb-4 text-white"
          >
            <span className="ml-2 text-2xl">Cryptocurrency</span>
          </a>
          <a href="#settings" className="flex items-center p-2 text-white">
            <span className="ml-2 text-2xl">Settings</span>
          </a>
        </nav>

        {/* Logout Button */}
        <div>
          <Link onClick={handleLogout}>
            <a href="#logout" className="flex items-center p-2 text-white">
              <span className="ml-2 text-2xl">Log Out</span>
            </a>
          </Link>
        </div>
      </div>

      {/* Fullscreen Sliding Dropdown for Small Screens */}
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
                  isActive("/Home") ? "bg-white text-blue-500 rounded-xl" : "text-white"
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
              <a
                href="#cryptocurrency"
                className="text-slate-100 text-2xl hover:text-blue-500 hover:bg-white hover:p-2 hover:rounded-xl"
              >
                Cryptocurrency
              </a>
              <a
                href="#settings"
                className="text-slate-100 text-2xl hover:text-blue-500 hover:bg-white hover:p-2 hover:rounded-xl"
              >
                Settings
              </a>
              <div className="flex-grow"></div>
              <Link onClick={handleLogout}>
                <a
                  href="#logout"
                  className="text-slate-100 text-2xl hover:text-red-700 mb-8"
                >
                  Logout
                </a>
              </Link>
            </nav>
          </div>

          {/* Overlay to close the dropdown */}
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
