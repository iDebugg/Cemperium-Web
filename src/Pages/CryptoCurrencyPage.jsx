import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import CryptocurrenciesList from "../Components/CryptocurrenciesList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const CryptoCurrencyPage = () => {
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="text-center p-2 display: grid block sm:block md:hidden">
        <div className="display: grid text-center items-center py-24 px-10">
          <h2 className="text-2xl font-bold mb-2 text-sky-500">
            Popular Cryptocurrencies By Market Cap
          </h2>
          <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2 max-w-md">
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
        </div>
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
          <div className="">
            <div className="grid place-items-center text-center py-32">
              <h2 className="text-3xl font-bold mb-4 text-sky-500">
                Popular Cryptocurrencies By Market Cap
              </h2>
              <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2 max-w-md">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="text-gray-400 mr-2"
                />
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

            <CryptocurrenciesList
              handleIsLoading={(isloading) => setLoading(isloading)}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default CryptoCurrencyPage;
