import React from 'react';

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <input
      type="text"
      className="form-control w-100 w-md-auto"
      placeholder="Search tasks..."
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      style={{ maxWidth: '300px' }}
    />
  );
};

export default SearchBar;
