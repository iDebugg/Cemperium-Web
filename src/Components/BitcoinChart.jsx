import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { fetchBitcoinData, fetchCurrentPrice } from "../apis/bitcoinApi.js";
import "../Styles/BitcoinChart.css";
import CustomTooltip from "../Components/CustomTooltip.jsx";
import bitcoinImg from "../img/bitcoin 1.png";
import {
  updateBitcoinData,
  updateCurrentBitcoinPrice,
  updateTimeFrame,
} from '../Controller/assetscontroller/index';

const timeFrames = {
  hour: 1 / 24,
  day: 1,
  week: 7,
  month: 30,
  year: 365,
};

const formatPrice = (price) => {
  return `${(price / 1000).toFixed(2)}k`;
};

const formatXAxisDate = (date) => {
  return new Date(date).toLocaleString("default", { month: "short" });
};

const formatTooltipDate = (date) => new Date(date).toISOString(); 

const BitcoinChart = () => {
  const dispatch = useDispatch();
  const bitcoinData = useSelector((state) => state.cryptoAssetsController.bitcoinData);
  const currentPrice = useSelector((state) => state.cryptoAssetsController.currentBitcoinPrice);
  const timeFrame = useSelector((state) => state.cryptoAssetsController.timeFrame);

  useEffect(() => {
    if (bitcoinData.length === 0 || currentPrice === null) {
      const getData = async () => {
        const days = timeFrames[timeFrame];
        const bitcoinData = await fetchBitcoinData(days);
        const formattedData = bitcoinData.map((item) => {
          const date = new Date(item[0]);
          return {
            date: date,
            formattedDate: formatXAxisDate(date), 
            tooltipDate: formatTooltipDate(date),
            price: item[1],
          };
        });
        dispatch(updateBitcoinData(formattedData)); 
      };

      const getCurrentPrice = async () => {
        const price = await fetchCurrentPrice();
        dispatch(updateCurrentBitcoinPrice(price));
      };

      getData();
      getCurrentPrice();
    }
  }, [timeFrame, dispatch, bitcoinData.length, currentPrice]);

  const handleTimeFrameChange = (key) => {
    dispatch(updateTimeFrame(key));
  };

  return (
    <div className="chart-container">
      <div className="display: flex justify-between items-center">
      <div  className="display> flex">
        <img src={bitcoinImg} alt="" className="bitcoingImg" />
        <h1 className="chart-title text-lg sm:text-lg md:text-lg lg:text-xl xl:text-xl font-semibold">BTC <span className="text-sm sm:text-sm md:text-sm lg:text-lg xl:text-lg">Bitcoin Price</span></h1>
      </div>
        <div className="time-frame-selector">
          {Object.keys(timeFrames).map((key) => (
            <button
              key={key}
              className={`time-frame-button ${timeFrame === key ? "active" : ""}`}
              onClick={() => handleTimeFrameChange(key)}
            >
              {key.charAt(0).toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {currentPrice !== null && (
        <h2 className="current-price text-2xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold"> ${currentPrice.toLocaleString()}</h2>
      )}

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={bitcoinData}>
          <defs>
            <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#66a6ff" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#66a6ff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} horizontal={false} /> 
          <XAxis dataKey="formattedDate" />
          <YAxis tickFormatter={formatPrice} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#66a6ff"
            fill="url(#colorBlue)"
            fillOpacity={1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BitcoinChart;
