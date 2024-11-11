import React, { useEffect, useState } from "react";
import axios from "axios";

const TransactionHistory = ({ selectedType, selectedStatus }) => {
  const [transactions, setTransactions] = useState([]);
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
    <div className="transaction-history p-4 sm:p-6 bg-white rounded-xl shadow-2xl h-[calc(100vh-110px)] flex flex-col">
      <h2 className="text-left text-lg font-semibold mb-4">Activities</h2>
      <div className="overflow-auto flex-1">
        <table className="w-full table-auto border-collapse">
          <thead className="sticky top-0">
            <tr className="bg-gray-100 text-gray-600 uppercase text-xs leading-normal">
              <th className="py-2 px-3 text-left">Type</th>
              <th className="py-2 px-3 text-left">Asset</th>
              <th className="py-2 px-3 text-left">Amount</th>
              <th className="py-2 px-3 text-left">USD</th>
              <th className="py-2 px-3 text-left">Status</th>
              <th className="py-2 px-3 text-left">Date</th>
              <th className="py-2 px-3 text-left">Address</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200 hover:bg-gray-50 text-xs">
              <td className="py-2 px-3">Withdrawal</td>
              <td className="py-2 px-3">BTC</td>
              <td className="py-2 px-3">0.1</td>
              <td className="py-2 px-3">$750</td>
              <td className={`py-2 px-3`}>Successful</td>
              <td className="py-2 px-3">12/20/2024</td>
              <td className="py-2 px-3">To 03bqvt83.22</td>
            </tr>
          </tbody>

          <tbody className="overflow-y-auto">
            {filteredTransactions.map((transaction, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-50 text-xs"
              >
                <td className="py-2 px-3">{transaction.type}</td>
                <td className="py-2 px-3">{transaction.asset}</td>
                <td className="py-2 px-3">{transaction.amount}</td>
                <td className="py-2 px-3">${transaction.usd}</td>
                <td className={`py-2 px-3 ${transaction.status.toLowerCase()}`}>
                  {transaction.status}
                </td>
                <td className="py-2 px-3">
                  {new Date(transaction.date).toLocaleString()}
                </td>
                <td className="py-2 px-3">To {transaction.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
