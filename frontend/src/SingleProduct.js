import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import io from "socket.io-client";
import axios from "axios";

const SingleProduct = () => {
  const { id } = useParams(); // Get the product ID from the URL parameters
  const [product, setProduct] = useState(null); 
  const [bidAmount, setBidAmount] = useState();
  const [highestBid, setHighestBid] = useState(0);
  const [bidStatus, setBidStatus] = useState("active");
  const [timer, setTimer] = useState(0);
  const [isRobotButtonActive, setIsRobotButtonActive] = useState(false);
  const [bidHistory, setBidHistory] = useState([]); // State to store bid history
  const user_id = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");
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
      // socket.current.emit("leaveProductRoom", product._id);

      socket.current.emit("joinProductRoom", product._id);

      socket.current.on("newBid", (bid) => {
        if (bid && bid.highestBid) {
          setHighestBid(bid.highestBid);
          setTimer(Math.floor(bid.remainingTime / 1000));
          // Update bid history with new bid if the bid is valid
          setBidHistory((prev) => [...prev, bid]);
        }
      });
     
    socket.current.on("biddingEnded", (transaction) => {
      setBidStatus(`Sold to userId: ${transaction.buyerID} for $${transaction.amount}`);
      clearInterval(timerRef.current); // Stop the timer when bidding ends
    });
    }

    return () => {
      if (product) {
        socket.current.emit("leaveProductRoom", product._id);
      }
    };
  }, [product]);


  useEffect(() => {
    if (timer > 0) {
      // setTimer(120); 
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current); // Cleanup on unmount
  }, [timer]);


  const handleBid = () => {
    if (!user_id || !token) {
      alert("Please log in to place a bid.");
      return;
    }

    if (bidAmount <= highestBid || bidAmount <= product.price) {
      alert("Bid amount must be higher than the current highest bid and Starting price.");
      return;
    }

    const newBid = {
      productId: product._id,
      userId: user_id,
      bidAmount: parseFloat(bidAmount),
      createdAt: new Date(), // Include bid creation time
    };

    socket.current.emit("placeBid", newBid);
    setIsRobotButtonActive(true); 

    // Start the timer
    // setTimer(120); // 2 minutes countdown
    // timerRef.current = setInterval(() => {
    //   setTimer((prev) => {
    //     if (prev <= 1) {
    //       clearInterval(timerRef.current);
    //       return 0;
    //     }
    //     return prev - 1;
    //   });
    // }, 1000); 
  
    // Add the new bid to the bid history
    // if (newBid.bidAmount) {
    //   setBidHistory((prev) => [...prev, newBid]);
    // }
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

          {/* Bid History Section */}
          <BidHistoryContainer>
            {bidHistory.map((bid, index) => (
              <BidHistoryItem key={index}>
                <p>User ID: {bid.highestBidder}</p>
                <p>Bid Amount: ${bid.highestBid}</p>
               
                <p>Time Left: {Math.floor(bid.remainingTime / 60000)}:{((bid.remainingTime % 60000) / 1000).toFixed(0).padStart(2, '0')}</p>
                <span className="createdAt">{new Date(bid.createdAt).toLocaleString()}</span>
              </BidHistoryItem>
            ))}
          </BidHistoryContainer>

          <BidInput
            type="number"
            placeholder="Enter your bid"
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

// Styled Components for Bid History Section
const BidHistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;

  .createdAt{
 
  margin-left:200px;
  }
`;

const BidHistoryItem = styled.div`
  background-color: #f8f8f8;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  width: 100%;
  max-width: 350px;

  


`;

const ProductContainer = styled.div`
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
  ${({ isactive }) => isactive && 'isactive: true;'} 
`;

const ProductImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  margin-bottom: 20px;
  box-sizing: border-box;
  margin-top:30px;
  border: 1px solid #ccc; 
  border-radius: 5px;
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
`;

export default SingleProduct;
