import React from "react";
import styled from "styled-components";

const Sort = ({ onSort }) => {
  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    onSort(selectedOption);
  };

  return (
    <Wrapper>
      <div className="sort-panel">
        <label>
          Sort By:
          <select onChange={handleSortChange}>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
            <option value="popularity">Popularity</option>
            <option value="reviews">Reviews</option>
          </select>
        </label>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-bottom: 20px;

  .sort-panel {
    display: flex;
    align-items: center;
  }

  label {
    font-size: 16px;
    margin-right: 10px;

    select {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  }
`;

export default Sort;
