import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Filter from "./components/Filter";
import Sort from "./components/Sort";
import ProductList from "./components/ProductList";
import SearchBar from "./components/SearchBar";
import config from './config';

const Voov = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchMessage, setSearchMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${config.backendUrl}/api/products`);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleFilter = (filters) => {
    let filteredProductsCopy = [...filteredProducts];

    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange.split("-");
      filteredProductsCopy = filteredProductsCopy.filter(
        (product) =>
          product.price >= parseInt(minPrice) &&
          product.price <= parseInt(maxPrice)
      );
    }

    if (filters.color) {
      filteredProductsCopy = filteredProductsCopy.filter(
        (product) => product.color === filters.color
      );
    }

    setFilteredProducts(filteredProductsCopy);
  };

  const handleSort = (sortOption) => {
    let sortedProducts = [...filteredProducts];

    switch (sortOption) {
      case "lowToHigh":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "highToLow":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredProducts(sortedProducts);
  };

  const handleSearch = (searchTerm) => {
    let searchedProducts = [...filteredProducts];
  
    if (searchTerm) {
      searchedProducts = searchedProducts.filter((product) =>
        product.product_name && product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    if (searchedProducts.length === 0) {
      setSearchMessage("Product not found");
      setFilteredProducts([]);
    } else {
      setSearchMessage("");
      setFilteredProducts(searchedProducts);
    }
  };
  

  return (
    <Container>
      <Sidebar>
        <Filter onFilter={handleFilter} />
      </Sidebar>
      <MainContent>
        <Header>
          <SearchBar onSearch={handleSearch} />
          <Sort onSort={handleSort} />
        </Header>
        {searchMessage && <Message>{searchMessage}</Message>}
        <ProductList products={filteredProducts} />
      </MainContent>
    </Container>
  );
};

export default Voov;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: center;
  margin: 2rem auto;
  // padding: 0 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;
const Sidebar = styled.div`
  flex: 1;
  margin-right:-40px;
  // padding: 20px;
  // background-color: #f7f7f7;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const MainContent = styled.div`
  flex: 3;
  
  padding: 20px;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Message = styled.p`
  color: red;
  font-weight: bold;
`;

