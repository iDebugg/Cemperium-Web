import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/TransactionHistoryMobile.css";

const TransactionHistoryMobile = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedType, setSelectedType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_HISTORIES_API_URL}`
      );
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();

    const interval = setInterval(() => {
      fetchTransactions();
    }, 60000);

    return () => clearInterval(interval);
  }, []);
  const filteredTransactions = transactions.filter((transaction) => {
    const typeMatch =
      selectedType === "All" || transaction.type === selectedType;
    const statusMatch =
      selectedStatus === "All" ||
      transaction.status.toLowerCase() === selectedStatus.toLowerCase();
    return typeMatch && statusMatch;
  });

  return (
    <div className="transaction-history-mobile h-[calc(100vh-150px)] flex flex-col">
      <div className="flex justify-between">
        <h2 className="text-slate-500 text-lg">Activities</h2>
        <div
          className="filter-button-mobile bg-white p-3 rounded-lg cursor-pointer items-center text-md"
          onClick={() => setFilterOpen(!filterOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-filter"
            viewBox="0 0 16 16"
            style={{ marginRight: "5px" }}
          >
            <path d="M6 10.5a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2.586l2.854-2.853A.5.5 0 0 0 12.5 4h-9a.5.5 0 0 0-.354.854L6 7.914v2.586z" />
            <path d="M3.5 1a.5.5 0 0 0-.354.854L6 5.707v2.586a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V5.707l2.854-2.853A.5.5 0 0 0 12.5 2h-9a.5.5 0 0 0-.354.146z" />
          </svg>
          Filter
        </div>
      </div>

      {filterOpen && (
        <div className="filter-dropdown-mobile mt-5 p-5 bg-slate-100 rounded-3xl text-slate-500">
          <div className="filter-group-mobile">
            <h3 className="mb-3">Type</h3>
            <button
              onClick={() => setSelectedType("All")}
              className={selectedType === "All" ? "active-mobile" : ""}
            >
              All
            </button>
            <button
              onClick={() => setSelectedType("Withdrawal")}
              className={selectedType === "Withdrawal" ? "active-mobile" : ""}
            >
              Withdrawal
            </button>
            <button
              onClick={() => setSelectedType("Deposit")}
              className={selectedType === "Deposit" ? "active-mobile" : ""}
            >
              Deposit
            </button>
            <button
              onClick={() => setSelectedType("Buy")}
              className={selectedType === "Buy" ? "active-mobile" : ""}
            >
              Buy
            </button>
            <button
              onClick={() => setSelectedType("Sell")}
              className={selectedType === "Sell" ? "active-mobile" : ""}
            >
              Sell
            </button>
          </div>
          <div className="filter-group-mobile">
            <h3 className="mb-3">Status</h3>
            <button
              onClick={() => setSelectedStatus("All")}
              className={selectedStatus === "All" ? "active-mobile" : ""}
            >
              All
            </button>
            <button
              onClick={() => setSelectedStatus("Successful")}
              className={selectedStatus === "Successful" ? "active-mobile" : ""}
            >
              Successful
            </button>
            <button
              onClick={() => setSelectedStatus("Failed")}
              className={selectedStatus === "Failed" ? "active-mobile" : ""}
            >
              Failed
            </button>
            <button
              onClick={() => setSelectedStatus("Processing")}
              className={selectedStatus === "Processing" ? "active-mobile" : ""}
            >
              Processing
            </button>
          </div>
        </div>
      )}

      <div className="transaction-container-mobile mt-5 overflow-y-auto flex-1 max-h-[calc(100vh-20px)]">
        <table className="min-w-full">
          <tbody>
            {filteredTransactions.map((transaction, index) => (
              <tr key={index} className="flex justify-between text-slate-600">
                <td className="text-left text-sm">
                  {transaction.type} <br />
                  <span className="text-xs">
                    {new Date(transaction.date).toLocaleString()}
                  </span>
                </td>
                <td
                  className={`status text-sm ${transaction.status.toLowerCase()}`}
                >
                  {transaction.status}
                </td>
                <td className="text-sm">To {transaction.address}</td>
                <td className="text-right text-sm">
                  {transaction.amount} {transaction.asset} <br />
                  <span className="text-xs">${transaction.usd}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistoryMobile;
