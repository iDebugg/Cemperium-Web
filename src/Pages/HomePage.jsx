import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import BnbPriceChart from "../Components/BnbPriceChart";
import SolanaPriceChart from "../Components/SolanaPriceChart";
import EthPriceChart from "../Components/EthPriceChart";
import BitcoinChart from "../Components/BitcoinChart";
import CryptocurrenciesList from "../Components/CryptocurrenciesList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import WalletBalance from "../Components/WalletBalance";
import CryptoAssets from "../Components/CryptoAssets";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="text-center p-2 display: grid block sm:block md:hidden">
        <div className="display: flex justify-between  mb-4">
          <BnbPriceChart />
          <SolanaPriceChart />
          <EthPriceChart />
        </div>
        <BitcoinChart />
        <CryptocurrenciesList
          handleIsLoading={(isloading) => setLoading(isloading)}
        />
      </div>
      <main className="pt-1 md:ml-64 hidden sm:hidden md:block">
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
          <div className="display: flex gap-8">
            <div className="display: grid w-9/12">
              <div className="display: flex gap-4">
                <BnbPriceChart />
                <SolanaPriceChart />
                <EthPriceChart />
              </div>
              <BitcoinChart />
              <CryptocurrenciesList
                handleIsLoading={(isloading) => setLoading(isloading)}
              />
            </div>
            <div className="display: grid gap-4">
              <div>
                <WalletBalance />
                <CryptoAssets />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;
