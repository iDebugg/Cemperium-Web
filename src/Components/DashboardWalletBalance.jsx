import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faCopy,
  faPlus,
  faMinus,
  faArrowDown,
  faArrowUp,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSelector } from "react-redux";
import BitcoinChart from "./BitcoinChart";

const DashboardWalletBalance = () => {
  const balance = useSelector(
    (state) => state.cryptoAssetsController.totalWalletBalance
  );
  const ethAddress = useSelector(
    (state) => state.cryptoAssetsController.ethWalletAddress
  );
  const [showBalance, setShowBalance] = useState(true);
  const [copied, setCopied] = useState(false);

  const toggleShowBalance = () => {
    setShowBalance(!showBalance);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ethAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const formatAddress = (address) => {
    if (!address) return "";
    const start = address.slice(0, 7);
    const end = address.slice(-4);
    return `${start}...${end}`;
  };

  return (
    <div className="wallet-balance-container display: flex pt-3 pb-3 pr-3 pl-3 mb-4 rounded-xl">
      <div className="display: grid ">
        <div className="balance-header display: flex items-center justify-left mb-2">
          <span className="currentBalanceText text-lg sm:text-lg md:text-lg lg:text-xl xl:text-xl mr-2 text-white">
            Current Balance
          </span>
          <FontAwesomeIcon
            icon={showBalance ? faEyeSlash : faEye}
            onClick={toggleShowBalance}
            className="icon text-white cursor-pointer"
          />
        </div>
        <div className="balance-display text-left font-bold text-3xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl text-white mb-2">
          {showBalance ? `$${balance}` : "****"}
        </div>
        <div className="wallet-address display: flex items-center justify-left text-left w-full mb-4 text-white">
          <div className="walletAndCopyIcon">
            {formatAddress(ethAddress)}
            <FontAwesomeIcon
              icon={faCopy}
              onClick={copyToClipboard}
              className="icon ml-5"
            />
            {copied && (
              <div className="copied-message px-1 bg-slate-400 text-white rounded-lg">
                Eth wallet Copied to clipboard!
              </div>
            )}
          </div>
        </div>
        <div className="actions-container display: flex justify-left">
          <div className="action-button display: flex items-center flex-col text-white mr-3">
            <button className="transactionBtn">
              <FontAwesomeIcon icon={faPlus} className="transactionBtnIcon" />
            </button>
            <span className="">Buy</span>
          </div>
          <div className="action-button display: flex items-center flex-col text-white mr-3">
            <button className="transactionBtn">
              <FontAwesomeIcon icon={faMinus} className="transactionBtnIcon" />
            </button>
            <span>Sell</span>
          </div>
          <div className="action-button display: flex items-center flex-col text-white mr-3">
            <button className="transactionBtn">
              <FontAwesomeIcon
                icon={faArrowDown}
                className="transactionBtnIcon"
              />
            </button>
            <span>Deposit</span>
          </div>
          <div className="action-button display: flex items-center flex-col text-white mr-3">
            <button className="transactionBtn">
              <FontAwesomeIcon
                icon={faArrowUp}
                className="transactionBtnIcon"
              />
            </button>
            <span>Withdraw</span>
          </div>
          <div className="action-button display: flex items-center flex-col text-white">
            <button className="transactionBtn">
              {" "}
              <FontAwesomeIcon
                icon={faExchangeAlt}
                className="transactionBtnIcon"
              />
            </button>
            <span>Swap</span>
          </div>
        </div>
      </div>

      {/* <BitcoinChart /> */}
    </div>
  );
};

export default DashboardWalletBalance;
