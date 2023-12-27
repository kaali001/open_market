import React from "react";
import styled from "styled-components";


const Sort = ({ onSort }) => {
  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    onSort(selectedOption); // Call the onSort function with the selected sorting option
  };

  return (
    <Wrapper>
    <div className="sort-panel">
      <label>
        Sort By: 
        <select onChange={handleSortChange}>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
          <option value="lsd">Popularity</option>
          <option value="#">Reviews</option>
         
        </select>
      </label>
    </div>

    


    </Wrapper>
    
  );
};

const Wrapper= styled.section`
   width: 25%;
  height: 8vh;
 
  position: relative;
  top: 1rem;
  left: 40rem;
  background-color: #fff;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2);
  .sort-panel{
    margin-left:20%;
    margin-top:0%;
  }

  label{
    font-size:20px;
  }
`;

export default Sort;
