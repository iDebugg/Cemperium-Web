import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

import CryptoAssets from "../Components/CryptoAssets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import WalletBalance from "../Components/WalletBalance";
import RecentTransactions from "../Components/RecentTransactions";
import CryptoAssetsWallet from "../Components/CryptoAssetsWallet";
import DashboardWalletBalance from "../Components/DashboardWalletBalance";

const WalletPage = () => {
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="text-center p-2 display: grid block sm:block md:hidden">
        <WalletBalance />
        <CryptoAssets />
      </div>
      <main className="pt-1 md:ml-64 hidden sm:hidden md:block ">
        <div className="p-2">
          <div className="hidden md:flex md:justify-between md:items-center bg-white shadow rounded-full px-4 py-2 mb-5">
            <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2 flex-1 max-w-md">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-gray-600 placeholder-gray-400 flex-1"
              />
              <button className="ml-2">
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-gray-500"
                />
              </button>
            </div>
          </div>
          <div className="display: flex gap-4">
            <div className="w-9/12">
              <DashboardWalletBalance />
              <CryptoAssetsWallet />
            </div>
            <div className="w-3/12">
              <div>
                <RecentTransactions />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default WalletPage;
