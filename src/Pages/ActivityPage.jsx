import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import BnbPriceChart from "../Components/BnbPriceChart";
import SolanaPriceChart from "../Components/SolanaPriceChart";
import EthPriceChart from "../Components/EthPriceChart";
import BitcoinChart from "../Components/BitcoinChart";
import CryptocurrenciesList from "../Components/CryptocurrenciesList";
import CryptoAssets from '../Components/CryptoAssets';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faArrowRight,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import TransactionHistoryMobile from '../Components/TransactionHistoryMobile';
import TransactionHistory from '../Components/TransactionHistory';
import CustomCalendar from '../Components/CustomCalendar';
import TransactionFilter from '../Components/TransactionFilter';

const ActivityPage = () => {
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState('All'); 
  const [selectedStatus, setSelectedStatus] = useState('All'); 
  const location = useLocation();
  const navigate = useNavigate();


  
  return (
    <>
      <Navbar />
      <div className="text-center p-2 display: grid block sm:block md:hidden">
       <TransactionHistoryMobile />
        
      </div>
      <main className="pt-1 md:ml-64 hidden sm:hidden md:block">
        {/* Your main content goes here */}
        <div className="p-2">
          {/* <h1 className="text-3xl font-bold">Main Content</h1> */}
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
             <TransactionHistory />
            </div>
            <div className="display: grid gap-4">
              <div>
                <CustomCalendar />
                <TransactionFilter 
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                />
              </div>
            </div>
          </div>
          {/* <p>This is where your main content goes.</p> */}
          {/* Add more content here as needed */}
        </div>
        
      </main>
    </>
  );
};

export default ActivityPage;
