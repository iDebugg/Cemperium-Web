import { createSlice } from "@reduxjs/toolkit";

const initialAssetsState = {
  coinList: [],
  totalWalletBalance: 0,
  ethWalletAddress: [],
  bitcoinData: [],
  currentBitcoinPrice: null,
  timeFrame: "year",
  bnbPrice: 0,
  bnbPriceChange: 0,
  bnbChartData: {
    labels: [],
    datasets: [
      {
        label: "Price",
        data: [],
        borderColor: "#FFFFFF",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderWidth: 2,
        tension: 0.4,
        fill: false,
        pointRadius: 0,
      },
    ],
  },
  ethPrice: 0,
  ethPriceChange: 0,
  ethChartData: {
    labels: [],
    datasets: [
      {
        label: "Price",
        data: [],
        borderColor: "#FFFFFF",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderWidth: 2,
        tension: 0.4,
        fill: false,
        pointRadius: 0,
      },
    ],
  },
  solPrice: 0,
  solPriceChange: 0,
  solChartData: {
    labels: [],
    datasets: [
      {
        label: "Price",
        data: [],
        borderColor: "#FFFFFF",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderWidth: 2,
        tension: 0.4,
        fill: false,
        pointRadius: 0,
      },
    ],
  },
};

export const createAssetsSlice = createSlice({
  name: "assets",
  initialState: initialAssetsState,
  reducers: {
    updateCoinList: (state, action) => {
      state.coinList = action.payload;
    },
    updateWalletBalance: (state, action) => {
      state.totalWalletBalance = action.payload;
    },
    updateEthWalletAddress: (state, action) => {
      state.ethWalletAddress = action.payload;
    },
    updateBitcoinData: (state, action) => {
      state.bitcoinData = action.payload;
    },
    updateCurrentBitcoinPrice: (state, action) => {
      state.currentBitcoinPrice = action.payload;
    },
    updateTimeFrame: (state, action) => {
      state.timeFrame = action.payload;
    },
    updateBnbPrice: (state, action) => {
      state.bnbPrice = action.payload;
    },
    updateBnbPriceChange: (state, action) => {
      state.bnbPriceChange = action.payload;
    },
    updateBnbChartData: (state, action) => {
      state.bnbChartData = action.payload;
    },
    updateEthPrice: (state, action) => {
      state.ethPrice = action.payload;
    },
    updateEthPriceChange: (state, action) => {
      state.ethPriceChange = action.payload;
    },
    updateEthChartData: (state, action) => {
      state.ethChartData = action.payload;
    },
    // New actions for SOL data
    updateSolPrice: (state, action) => {
      state.solPrice = action.payload;
    },
    updateSolPriceChange: (state, action) => {
      state.solPriceChange = action.payload;
    },
    updateSolChartData: (state, action) => {
      state.solChartData = action.payload;
    },
  },
});

export const {
  updateCoinList,
  updateWalletBalance,
  updateEthWalletAddress,
  updateBitcoinData,
  updateCurrentBitcoinPrice,
  updateTimeFrame,
  updateBnbPrice,
  updateBnbPriceChange,
  updateBnbChartData,
  updateEthPrice,
  updateEthPriceChange,
  updateEthChartData,
  updateSolPrice,
  updateSolPriceChange,
  updateSolChartData,
} = createAssetsSlice.actions;

export default createAssetsSlice.reducer;
