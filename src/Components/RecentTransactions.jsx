import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/RecentTransactions.css';

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Fetch transactions from the API
  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_HISTORIES_API_URL}`);
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
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
    const statusMatch = selectedStatus === 'All' || transaction.status.toLowerCase() === selectedStatus.toLowerCase();
    return statusMatch;
  });

  return (
    <div className="recent-transactions h-[calc(100vh-110px)] flex flex-col rounded-2xl p-5 bg-white">
      <h2 className='mb-4 font-semibold text-slate-700'>Recent Transactions</h2>
      <h5 className='text-xs text-slate-500 mb-2'>Filters</h5>
      <div className="filter-container display: flex mb-5 items-center">
        <button
          className={`filter-button p-1 rounded-lg mr-2 cursor: pointer text-sm text-slate-500 ${selectedStatus === 'All' ? 'active' : ''}`}
          onClick={() => setSelectedStatus('All')}
        >
          All
        </button>
        <select
          id="status"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="filter-dropdown p-1 rounded-lg text-sm text-slate-500"
        >
          <option value="Successful">Successful</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
      </div>
      <div className="scroll-contnt overflow-auto flex-1 p-2">
      {/* <div className="transaction-list display: grid flex-row">
       
          <div className="transaction-item display: flex justify-between py-2">
            <div className="transaction-info display: flex flex-col">
              <div className="transaction-type text-sm font-normal">
                ETH Withdrawal
              </div>
              <div className="transaction-date text-xs font-thin">17/12/2024</div>
             
            </div>
            <div className="transaction-amount text-sm font-normal">
                0.156 BTC
              </div>
          </div>
          
          
         
       
          
     
        
      </div> */}

      <div className="transaction-list display: grid flex-row">
        {filteredTransactions.map((transaction, index) => (
          <div key={index} className="transaction-item display: flex justify-between py-2">
            <div className="transaction-info display: flex flex-col">
              <div className="transaction-type text-sm font-normal">
                {transaction.type} {transaction.asset}
              </div>
              <div className="transaction-date text-xs font-thin">{new Date(transaction.date).toLocaleString()}</div>
              
            </div>
            <div className="transaction-amount text-sm font-normal">
                {transaction.amount} {transaction.asset}
              </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default RecentTransactions;
