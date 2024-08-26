import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import io from "socket.io-client";
import axios from "axios";



const SingleProduct = () => {
  const { id } = useParams(); // Get the product ID from the URL parameters
  const [product, setProduct] = useState(null); 
  const [bidAmount, setBidAmount] = useState(0);
  const [highestBid, setHighestBid] = useState(0);
  const [bidStatus, setBidStatus] = useState("active");
  const [timer, setTimer] = useState(0);
  const [isRobotButtonActive, setIsRobotButtonActive] = useState(false);
  const user_id = localStorage.getItem("user_id");
  const timerRef = useRef(null);


  const socket = useRef(null);

  // Fetch product details from the backend using the ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`); 
        setProduct(response.data); 
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    socket.current = io("http://localhost:5000");

    return () => {
      socket.current.disconnect(); // Disconnect socket when component unmounts
    };
  }, []);

  useEffect(() => {
    if (product) {
      // Leave the previous room before joining the new one
      socket.current.emit("leaveProductRoom", product._id);

      socket.current.emit("joinProductRoom", product._id);

      socket.current.on("newBid", (bid) => {
        setHighestBid(bid.highestBid);
      });

      socket.current.on("biddingEnded", (transaction) => {
        setBidStatus(`Sold to user ${transaction.buyerID} for $${transaction.amount}`);
        clearInterval(timerRef.current); // Stop the timer when bidding ends
      });
    }

    return () => {

      if (product) {
        socket.current.emit("leaveProductRoom", product._id);
      }
    
    };
  }, [product]);

  const handleBid = () => {
    if (bidAmount <= highestBid || bidAmount<=product.price) {
      alert("Bid amount must be higher than the current highest bid.");
      setTimer(120);
      return;
    }
    socket.current.emit("placeBid", {
      productId: product._id,
      userId: user_id,
      bidAmount: parseFloat(bidAmount),
    });
    setIsRobotButtonActive(true); 

    // Start the timer
    setTimer(120); // 2 minutes countdown
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  const { product_name, product_image, description, price } = product;

  return (
    <ProductContainer>
      
      <ProductInfo>
        <ProductImage src={product_image} alt={product_name} />
        
        <ProductDetails>
        <StatusSection>
        <RobotButton isactive={isRobotButtonActive ? 'true' : undefined}></RobotButton>

        <BidStatus>Status: {bidStatus}</BidStatus>
      </StatusSection>
        
          <ProductName>{product_name}</ProductName>
          <ProductPrice>Starting Price: ${price}</ProductPrice>
          <HighestBid>Highest Bid: ${highestBid}</HighestBid>
          <BidInput
            type="number"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
          />
          <BidButton onClick={handleBid}>Place Bid</BidButton>
          <Timer>{timer > 0 ? `Time Left: ${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}` : "Bidding Ended"}</Timer>
        </ProductDetails>
      </ProductInfo>
      
      <ProductDescription>{description}</ProductDescription>
    </ProductContainer>
  );
};

const ProductContainer = styled.div`
  // display: flex;
  // flex-direction: column;
  padding: 20px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const StatusSection = styled.div`
 
  justify-content: space-between;

  max-width: 800px;
  margin-bottom: 10px;
`;

const RobotButton = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ isactive }) => (isactive ? 'green' : 'gray')};
  border: none;
  ${({ isactive }) => isactive && 'isactive: true;'} // Only apply when isActive is true
`;

const ProductImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  margin-bottom: 20px;
  box-sizing: border-box;
  margin-top:30px;
  border: 1px solid #ccc; /* Add a border */
  border-radius: 5px; /* Make the corners rounded */
`;

const ProductDetails = styled.div`
  text-align: left;
`;

const ProductName = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  line-height: 2.4;
    
    font-weight: 10pt;
    display: inline-block;
`;

const ProductDescription = styled.p`
  font-size: 16px;
  color: #888;
  margin-top: 40px;
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

const Timer = styled.p`
  font-size: 16px;
  color: #e00;
  margin-top: 20px;
`;

const BidStatus = styled.p`
  font-size: 16px;
  color: #333;
  // margin-top: 20px;
`;

export default SingleProduct;