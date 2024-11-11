import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import "chart.js/auto";
import ethLogo from "../img/Ethereum.png";

import { useDispatch, useSelector } from "react-redux";
import {
  updateEthPrice,
  updateEthPriceChange,
  updateEthChartData,
} from "../Controller/assetscontroller/index";

const EthPriceChart = () => {
  const dispatch = useDispatch();

  const price = useSelector((state) => state.cryptoAssetsController.ethPrice);
  const priceChange = useSelector(
    (state) => state.cryptoAssetsController.ethPriceChange
  );
  const chartData = useSelector(
    (state) => state.cryptoAssetsController.ethChartData
  );

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=1"
        );
        const prices = response.data.prices;

        const labels = prices.map((price) =>
          new Date(price[0]).toLocaleTimeString()
        );
        const data = prices.map((price) => price[1]);

        const newPrice = data[data.length - 1];
        const lastPrice = data.length > 1 ? data[data.length - 2] : newPrice;

        dispatch(updateEthPrice(newPrice));
        dispatch(
          updateEthPriceChange(((newPrice - lastPrice) / lastPrice) * 100)
        );

        dispatch(
          updateEthChartData({
            labels,
            datasets: [
              {
                label: "Price",
                data,
                borderColor: "#FFFFFF",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderWidth: 2,
                tension: 0.4,
                fill: false,
                pointRadius: 0,
              },
            ],
          })
        );
      } catch (error) {
        console.error("Error fetching price data:", error);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 60000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="bnb-price-chart display: flex flex-col items-center p-3">
      <div className="eth-info-container display: flex">
        <div className="eth-price-info">
          <img
            src={ethLogo}
            alt="Ethereum Logo"
            className="eth-logo w-10 sm:w-12 md:w-25 lg:w-15 xl:w-15 mb-2"
          />
          <div className="eth-price text-center text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold">
            $
            {price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        </div>
        <div className="">
          <h1>....</h1>
        </div>
      </div>
    </div>
  );
};

export default EthPriceChart;
