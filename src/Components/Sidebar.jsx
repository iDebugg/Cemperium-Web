import React from 'react';

const Sidebar = () => {
  return (
    <div className="bg-blue-500 w-64 h-screen p-4 hidden md:flex flex-col justify-between">
      <div>
        <div className="flex items-center mb-8">
          {/* Logo and Title */}
          <div className="text-white text-2xl font-bold">Cemperium</div>
        </div>
        
        {/* Menu Items */}
        <nav>
          <a href="#home" className="flex items-center p-2 mb-4 rounded bg-white text-blue-500">
            <span className="material-icons">home</span>
            <span className="ml-2">Home</span>
          </a>
          <a href="#activity" className="flex items-center p-2 mb-4 text-white">
            <span className="material-icons">list_alt</span>
            <span className="ml-2">Activity</span>
          </a>
          <a href="#wallet" className="flex items-center p-2 mb-4 text-white">
            <span className="material-icons">account_balance_wallet</span>
            <span className="ml-2">Wallet</span>
          </a>
          <a href="#crypto" className="flex items-center p-2 mb-4 text-white">
            <span className="material-icons">currency_bitcoin</span>
            <span className="ml-2">Cryptocurrency</span>
          </a>
          <a href="#settings" className="flex items-center p-2 text-white">
            <span className="material-icons">settings</span>
            <span className="ml-2">Settings</span>
          </a>
        </nav>
      </div>
      
      {/* Logout Button */}
      <div>
        <a href="#logout" className="flex items-center p-2 text-white">
          <span className="material-icons">logout</span>
          <span className="ml-2">Log Out</span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
