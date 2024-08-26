import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Sort from "./components/Sort";
import ProductList from "./components/ProductList";
import SearchBar from "./components/SearchBar";

const Voov = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchMessage, setSearchMessage] = useState("");

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products"); // Adjust the endpoint based on your backend route
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleFilter = (filters) => {
    let filteredProductsCopy = [...filteredProducts]; // Create a copy of the products array

    // Apply filtering based on filter parameters
    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange.split("-");
      filteredProductsCopy = filteredProductsCopy.filter(
        (product) =>
          product.price >= parseInt(minPrice) && product.price <= parseInt(maxPrice)
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
    let searchedProducts = [...filteredProducts]; // Create a copy of the products array

    // Apply search logic based on the search term
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
      <SearchBar onSearch={handleSearch} />
      {searchMessage && <p>{searchMessage}</p>}
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default Voov;
