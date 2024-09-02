import React from "react";
import styled from "styled-components";

const Filter = ({ onFilter }) => {
  const handleFilterChange = (e) => {
    // Implement filtering logic based on user input
  };

  return (
    <FilterPanel>
      <div className="filter-options">
        <h2>Filter</h2>
        <label className="label-box">
          <h3>Price Range</h3>
          <input type="text" onChange={handleFilterChange} />
        </label>
        <label className="label-box">
          <h3>Color</h3>
          <select onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
          </select>
        </label>
      </div>
    </FilterPanel>
  );
};

const FilterPanel = styled.div`
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin-bottom: 20px;

  h2 {
    margin-bottom: 20px;
  }

  input, select {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  @media (min-width: 768px) {
    width: 80%;
  }
`;

export default Filter;
