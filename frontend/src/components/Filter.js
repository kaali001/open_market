



import React from "react";
import styled from "styled-components";

const Filter = ({ onFilter }) => {

  // const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (e) => {
    // We will Implement filtering logic based on user input
    //by  Calling  the onFilter function with the filter parameters
  };

  return (
    // <FilterPanel className={`filter-panel ${isOpen ? "open" : ""}`}>
     <FilterPanel>
      <div className="filter-options">
       <h2>Filter</h2>
        <label className="lable-box">
          <h3>Price-range</h3>
          <input type="text" onChange={handleFilterChange} />
        </label>
        <label className="lable-box">
          <h3>color</h3>
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
  width: 18%;
  height: 80vh;
  position: absolute;
  top: 12rem;
  left: 0rem;
  background-color: #fff;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2);
  padding: 20px;
  transition: left 0.3s ease-in-out;
 h2 {
  margin-bottom:30px;
 }
 input{
  margin-bottom:30px;
 }
  .lable-box{
    margin-top:5rem;
  }

  @media (max-width: 768px) {
    width: 80%;
    left: -80%;
  }

  &.open {
    left: 0;
  }
`;

export default Filter;
