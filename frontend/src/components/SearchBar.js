import React, { useState } from "react";
import styled from "styled-components";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  return (
    <SearchContainer>
      <label>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search products..."
        />
      </label>
      <button onClick={handleSearchClick}>Search</button>
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  position: absolute;
  top: 15.5rem;
  right: 6rem;
  display: flex;
  align-items: center;

  label {
    input {
      padding: 8px;
      width: 200px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
      margin-right: 10px;
      outline: none;
    }
  }

  button {
    padding: 8px 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    top: 10px;
    right: 10px;

    label {
      input {
        width: 150px;
      }
    }
  }
`;

export default SearchBar;
