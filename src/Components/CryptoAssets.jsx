import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { updateCoinList } from "../Controller/assetscontroller";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CryptoAssets = () => {
  const data = useSelector((state) => state.cryptoAssetsController.coinList);
  const [assetData, setAssetListData] = useState(data);
  const [filteredAssetData, setFilteredAssetData] = useState(data);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const searchInputRef = useRef(null);

  useEffect(() => {
    setFilteredAssetData(data);
    setAssetListData(data);
    setLoading(true);

    // Simulate API fetch here if needed, or set `loading` to false if data is already fetched
    setTimeout(() => setLoading(false), 1000);
  }, [data]);

  const formatPrice = (price) => {
    const number = parseFloat(price.replace(/[^0-9.-]+/g, ""));
    return number ? `$${number.toLocaleString()}` : '$0';
  };

  const formatBalance = (balance) => {
    const number = parseFloat(balance.replace(/[^0-9.-]+/g, ""));
    return number ? number.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 }) : '0.0000';
  };

  const calculateBalance = (price, balance) => {
    const priceNumber = parseFloat(price.replace(/[^0-9.-]+/g, ""));
    const balanceNumber = parseFloat(balance.replace(/[^0-9.-]+/g, ""));
    const totalBalance = priceNumber * balanceNumber;
    return totalBalance ? `$${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 })}` : '$0.0000';
  };

  const truncateName = (name) => {
    return name.length > 3 ? name.slice(0, 3) + '...' : name;
  };

  const handleSearchChange = (e) => {
    const searchWord = e.currentTarget.value;
    setSearchTerm(searchWord);
    const filteredCoins = assetData.filter((asset) => asset.assetName.toLowerCase().includes(searchWord.toLowerCase()));
    setFilteredAssetData(filteredCoins);
  };

  const handleSearchClick = () => {
    setSearchVisible(true);
    setTimeout(() => {
      searchInputRef.current.focus();
    }, 0);
  };

  const handleCancelClick = () => {
    setSearchVisible(false);
    setSearchTerm("");
    setFilteredAssetData(assetData);
  };

  return (
    <div id="data-containerAssets" className="bg-white drop-shadow-lg p-4">
      <div className='flex justify-between items-center mb-4'>
        <span className="text-lg font-semibold">Assets</span>
        {searchVisible ? (
          <div className="flex items-center space-x-2">
            <input
              onChange={handleSearchChange}
              type="text"
              className="assetsSearchInput p-2 border rounded-md w-full"
              value={searchTerm}
              placeholder="Search for coins..."
              ref={searchInputRef}
            />
            <button onClick={handleCancelClick} className="text-gray-400 hover:text-gray-600">
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        ) : (
          <button onClick={handleSearchClick} className="text-gray-400 hover:text-gray-600">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        )}
      </div>

      <div className="scroll-content">
        {loading ? (
          <div>
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="flex items-center py-2">
                <Skeleton circle={true} height={40} width={40} />
                <div className="ml-4 w-full">
                  <Skeleton height={20} width="60%" />
                  <Skeleton height={15} width="40%" />
                </div>
                <div className="ml-auto">
                  <Skeleton height={20} width="60px" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          filteredAssetData.map((coin) => (
            <div key={coin.assetSymbol} className="flex justify-between items-center py-2 border-b">
              <div className="flex items-center space-x-3">
                <img src={coin.assetImage} alt={coin.assetName} className="w-8 h-8 " />
                <div>
                  <div className="text-slate-600 font-semibold">{coin.assetSymbol}</div>
                  <div className="text-gray-500 text-sm">{truncateName(coin.assetName)}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-slate-600 font-semibold">{calculateBalance(coin.assetMarketPrice, coin.assetBalance)}</div>
                <div className=" text-slate-600 text-gray-500 text-sm">{formatBalance(coin.assetBalance)}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CryptoAssets;
