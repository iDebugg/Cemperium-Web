import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { updateCoinList } from "../Controller/assetscontroller";

const CryptocurrenciesTable = ({ handleIsLoading }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cryptoAssetsController.coinList);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token not found in local storage");
        setError("Token not found in local storage");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      if (data.length === 0) {
        handleIsLoading(true);
        setLoading(true);

        try {
          const response = await axios.get(`${process.env.REACT_APP_CRYPTOASSETS_API_URL}`, config);
          dispatch(updateCoinList(response.data.myCoins));
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("Error fetching data");
        } finally {
          setLoading(false);
          handleIsLoading(false);
        }
      }
    };

    fetchData();
  }, [data, dispatch, handleIsLoading]);

  const formatPrice = (price) => {
    if (!price) return "N/A";
    return parseFloat(price.replace(/[^0-9.-]+/g, "")).toLocaleString();
  };

  const formatPercentage = (percentage) => {
    if (!percentage) return "N/A";
    const value = parseFloat(percentage.replace(/[^0-9.-]+/g, ""));
    return value >= 0 ? `▲ ${value}%` : `▼ ${Math.abs(value)}%`;
  };

  const truncateName = (name) => (name.length > 5 ? name.slice(0, 5) + ".." : name);

  if (loading) {
    return (
      <div className="w-full overflow-x-auto p-4">
        <h4 className="text-left text-lg font-semibold mt-4 mb-2">Cryptocurrencies</h4>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 font-medium text-left text-slate-400">Coin</th>
              <th className="py-2 px-4 font-medium text-left text-slate-400">Price</th>
              <th className="py-2 px-4 font-medium text-left text-slate-400">24h</th>
              <th className="py-2 px-4 font-medium text-left hidden md:table-cell text-slate-400">Market Cap</th>
              <th className="py-2 px-4 font-medium text-left text-slate-400">Buy</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-2 flex items-center space-x-2">
                  <Skeleton circle={true} height={32} width={32} />
                  <div>
                    <Skeleton width={50} height={20} />
                    <Skeleton width={30} height={15} />
                  </div>
                </td>
                <td className="py-2 px-2">
                  <Skeleton width={60} height={20} />
                </td>
                <td className="py-2 px-2">
                  <Skeleton width={50} height={20} />
                </td>
                <td className="py-2 px-2 hidden md:table-cell">
                  <Skeleton width={80} height={20} />
                </td>
                <td className="py-2 px-2">
                  <Skeleton width={50} height={30} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  if (data.length === 0) {
    return <div className="p-4">No coins available.</div>;
  }

  return (
    <div className="w-full overflow-x-auto">
      <h4 className="text-left text-lg font-semibold mt-4 mb-2">Cryptocurrencies</h4>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-4 font-medium text-left text-slate-400">Coin</th>
            <th className="py-2 px-4 font-medium text-left text-slate-400">Price</th>
            <th className="py-2 px-4 font-medium text-left text-slate-400">24h</th>
            <th className="py-2 px-4 font-medium text-left hidden md:table-cell text-slate-400">Market Cap</th>
            <th className="py-2 px-4 font-medium text-left text-slate-400">Buy</th>
          </tr>
        </thead>
        <tbody>
          {data.map((coin) => (
            <tr key={coin.assetSymbol} className="border-b last:border-b-0">
              <td className="py-2 px-2 flex items-center space-x-2">
                <img src={coin.assetImage} alt={coin.assetName} className="w-8 h-8" />
                <div>
                  <div className="text-slate-600 font-medium text-left">{truncateName(coin.assetName)}</div>
                  <div className="text-gray-500 text-sm text-left hidden">{coin.assetSymbol}</div>
                </div>
              </td>
              <td className="text-slate-600 py-1 px-1 text-center">${formatPrice(coin.assetMarketPrice)}</td>
              <td
                className={`py-2 px-2 ${
                  parseFloat(coin.assetPercentChange24h) >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {formatPercentage(coin.assetPercentChange24h)}
              </td>
              <td className="text-slate-600 py-2 px-4 hidden md:table-cell">${formatPrice(coin.assetMarketCap)}</td>
              <td className="py-2 px-2">
                <button
                  className="bg-blue-400 text-white py-1 px-3 rounded-md md:py-2 md:px-4"
                  aria-label={`Buy ${coin.assetName}`}
                >
                  Buy
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptocurrenciesTable;
