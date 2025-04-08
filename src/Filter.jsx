import React from 'react';

const Filter = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { value: 'all', label: 'All' },
    { value: 'completed', label: 'Completed' },
    { value: 'incomplete', label: 'Incomplete' },
  ];

  return (
    <div className="btn-group" role="group" aria-label="Filter tasks">
      {filters.map((filter) => (
        <button
          key={filter.value}
          type="button"
          className={`btn btn-outline-primary ${
            currentFilter === filter.value ? 'active' : ''
          }`}
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default Filter;
