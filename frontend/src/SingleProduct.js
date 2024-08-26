import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import io from "socket.io-client";
import axios from "axios"; // Import axios to fetch data from the backend

// const socket = io("http://localhost:5000"); // Adjust to your server URL

const SingleProduct = () => {
  const { id } = useParams(); // Get the product ID from the URL parameters
  const [product, setProduct] = useState(null); 
  const [bidAmount, setBidAmount] = useState(0);
  const [highestBid, setHighestBid] = useState(0);
  const [bidStatus, setBidStatus] = useState("Active");
  const user_id = localStorage.getItem("user_id");

  // Fetch product details from the backend using the ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`); // Replace with your actual API endpoint
        setProduct(response.data); // Set the fetched product in state
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const socket = io("http://localhost:5000");
  useEffect(() => {
    if (product) {
      // Leave the previous room before joining the new one
      socket.emit("leaveProductRoom", product._id);

      socket.emit("joinProductRoom", product._id);

      socket.on("newBid", (bid) => {
        setHighestBid(bid.highestBid);
      });

      socket.on("biddingEnded", (transaction) => {
        setBidStatus(`Sold to user ${transaction.buyerID} for $${transaction.amount}`);
      });
    }

    return () => {
      // Ensure socket leaves the current room before disconnecting
      if (product) {
        socket.emit("leaveProductRoom", product._id);
      }
      socket.disconnect(); // Disconnect socket when component unmounts
    };
  }, [product]);

  const handleBid = () => {
    socket.emit("placeBid", {
      productId: product._id,
      userId: user_id,
      bidAmount: parseFloat(bidAmount) // Ensure bidAmount is a number
    });
    console.log("productID", product._id);
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  const { product_name, product_image, description, price } = product;

  return (
    <ProductContainer>
      <ProductImage src={product_image} alt={product_name} />
      <ProductDetails>
        <ProductName>{product_name}</ProductName>
        <ProductDescription>{description}</ProductDescription>
        <ProductPrice>Starting Price: ${price}</ProductPrice>
        <HighestBid>Highest Bid: ${highestBid}</HighestBid>
        <BidInput
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
        />
        <BidButton onClick={handleBid}>Place Bid</BidButton>
        <BidStatus>{bidStatus}</BidStatus>
      </ProductDetails>
    </ProductContainer>
  );
};

const ProductContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
`;

const ProductImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  margin-bottom: 20px;
`;

const ProductDetails = styled.div`
  text-align: center;
`;

const ProductName = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const ProductDescription = styled.p`
  font-size: 16px;
  color: #888;
  margin-bottom: 20px;
`;

const ProductPrice = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

const HighestBid = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #444;
  margin-bottom: 20px;
`;

const BidInput = styled.input`
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 300px;
  box-sizing: border-box;
`;

const BidButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const BidStatus = styled.p`
  font-size: 16px;
  color: #333;
  margin-top: 20px;
`;

export default SingleProduct;
