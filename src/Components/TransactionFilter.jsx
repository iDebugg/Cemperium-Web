// TransactionFilter.js

import React from 'react';
import PropTypes from 'prop-types';
import '../Styles/TransactionFilter.css'; 

const TransactionFilter = ({ selectedType, setSelectedType, selectedStatus, setSelectedStatus }) => {
  const types = ['All', 'Withdrawal', 'Deposit', 'Buy', 'Sell'];
  const statuses = ['All', 'Successful', 'Failed', 'Processing'];

  return (
    <div className="filters display: grid gap-5 bg-white shadow-2xl rounded-3xl p-5">
        <h4  className='text-md font-semibold'>Filters</h4>
        <h5 className='text-xs'>Type</h5>
      <div className="filter-group display: flex flex-row gap-2">
        {types.map((type) => (
          <button
            key={type}
            className={`text-sm font-medium p-1 rounded-lg cursor: pointer bg-white ${selectedType === type ? 'active' : ''}`}
            onClick={() => setSelectedType(type)}
          >
            {type}
          </button>
        ))}
      </div>
      <h5 className='text-xs'>Status</h5>
      <div className="filter-group display: flex flex-row gap-2">
    
        {statuses.map((status) => (
          <button
            key={status}
            className={`text-sm font-medium p-1 rounded-lg cursor: pointer bg-white ${selectedStatus === status ? 'active' : ''}`}
            onClick={() => setSelectedStatus(status)}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
};

TransactionFilter.propTypes = {
  selectedType: PropTypes.string.isRequired,
  setSelectedType: PropTypes.func.isRequired,
  selectedStatus: PropTypes.string.isRequired,
  setSelectedStatus: PropTypes.func.isRequired,
};

export default TransactionFilter;
