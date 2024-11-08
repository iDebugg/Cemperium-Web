// Navbar.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowRight, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import NavLogo from '../img/Navlogo.svg'
import '../Styles/Navbar.css'
import DropdownLogo from '../img/Dropdownlogo.svg'
import CemperiumLogo from "../img/Logo.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Main Navbar */}
      <div className="flex items-center bg-white shadow-md p-4 rounded-full space-x-4">
        {/* Logo */}
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
          <img
            src={NavLogo} // Replace with your logo path or import
            alt="Logo"
            className="w-8 h-8"
          />
        </div>

        {/* Search Bar */}
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 flex-1 max-w-md">
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

      {/* Fullscreen Sliding Dropdown Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-full bg-white transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Close Icon */}
        <button onClick={toggleDropdown} className="absolute top-4 right-4 text-gray-500 text-2xl">
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <nav className="navvdrropdwn flex flex-col h-full p-8 space-y-6">
            <img src={DropdownLogo} alt="" className='mb-20' />
          <a href="#home" className="text-slate-100 text-2xl hover:text-blue-500 hover:bg-white hover:p-2 hover:rounded-xl">
            Home
          </a>
          <a href="#activity" className="text-slate-100 text-2xl hover:text-blue-800 hover:bg-white hover:p-2 hover:rounded-xl">
            Activity
          </a>
          <a href="#wallets" className="text-slate-100 text-2xl hover:text-blue-500 hover:bg-white hover:p-2 hover:rounded-xl">
            Wallets
          </a>
          <a href="#cryptocurrency" className="text-slate-100 text-2xl hover:text-blue-500 hover:bg-white hover:p-2 hover:rounded-xl">
            Cryptocurrency
          </a>
          <a href="#settings" className="text-slate-100 text-2xl hover:text-blue-500 hover:bg-white hover:p-2 hover:rounded-xl">
            Settings
          </a>

          {/* Spacer to push Logout to the bottom */}
          <div className="flex-grow"></div>

          <a href="#logout" className="text-slate-100 text-2xl hover:text-red-700 mb-8">
            Logout
          </a>
        </nav>
      </div>

      {/* Overlay to close the dropdown */}
      {isOpen && (
        <div
          onClick={toggleDropdown}
          className="fixed inset-0 bg-black opacity-50 z-40"
        ></div>
      )}
    </div>
  );
};

export default Navbar;
