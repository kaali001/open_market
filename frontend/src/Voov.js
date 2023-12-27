import React, { useState } from "react";
import Products from "./Products"; // Import the products array directly
import Filter from "./components/Filter";
import Sort from "./components/Sort";
import ProductList from "./components/ProductList";
import SearchBar from "./components/SearchBar";

const Voov = () => {
  const [filteredProducts, setFilteredProducts] = useState(Products);
  const [searchMessage, setSearchMessage] = useState("");

  const handleFilter = (filters) => {
    let filteredProducts = [...Products]; // Create a copy of the products array

    // Apply filtering based on filter parameters
    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange.split("-");
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= parseInt(minPrice) && product.price <= parseInt(maxPrice)
      );
    }

    if (filters.color) {
      filteredProducts = filteredProducts.filter((product) => product.color === filters.color);
    }


    setFilteredProducts(filteredProducts);
  };

  const handleSort = (sortOption) => {
    let sortedProducts = [...filteredProducts]; // Sort the filtered products

    // Apply sorting based on selected option
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
    let searchedProducts = [...Products]; // Create a copy of the products array

    // Here applying search logic based on the search term
    if (searchTerm) {
      searchedProducts = searchedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (searchedProducts.length === 0) {
        // Set a message indicating no results found
        setSearchMessage("Product not found");
        // Set filtered products to an empty array
        setFilteredProducts([]);
      } else {
        // Reset the search message and set filtered products to the searched products
        setSearchMessage("");
        setFilteredProducts(searchedProducts);
      }

    
  };

  return (
    <div className="app">
      <Filter onFilter={handleFilter} />
      <Sort onSort={handleSort} />
      <SearchBar onSearch={handleSearch}/>
      {searchMessage && <p>{searchMessage}</p>}
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default Voov;
