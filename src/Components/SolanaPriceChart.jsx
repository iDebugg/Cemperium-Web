// src/components/SolanaPriceChart.js

import React, { useEffect } from "react";
import axios from "axios";
import "chart.js/auto";
import solanaLogo from "../img/Solana.png";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSolPrice,
  updateSolPriceChange,
  updateSolChartData,
} from "../Controller/assetscontroller/index";

const SolanaPriceChart = () => {
  const dispatch = useDispatch();
  const price = useSelector((state) => state.cryptoAssetsController.solPrice);
  const priceChange = useSelector(
    (state) => state.cryptoAssetsController.solPriceChange
  );
  const chartData = useSelector(
    (state) => state.cryptoAssetsController.solChartData
  );

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/solana/market_chart?vs_currency=usd&days=1"
        );
        const prices = response.data.prices;

        const labels = prices.map((price) =>
          new Date(price[0]).toLocaleTimeString()
        );
        const data = prices.map((price) => price[1]);

        const newPrice = data[data.length - 1];
        const lastPrice = data.length > 1 ? data[data.length - 2] : newPrice;
        dispatch(updateSolPrice(newPrice));
        dispatch(
          updateSolPriceChange(((newPrice - lastPrice) / lastPrice) * 100)
        );

        dispatch(
          updateSolChartData({
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
      <div className="sol-info-container display: flex">
        <div className="sol-price-info">
          <img
            src={solanaLogo}
            alt="Solana Logo"
            className="solana-logo w-10 sm:w-12 md:w-25 lg:w-15 xl:w-15 mb-2"
          />
          <div className="sol-price text-center text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold">
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

export default SolanaPriceChart;
