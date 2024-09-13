import React from 'react';
import styled from 'styled-components';

const TransactionItem = ({ transaction }) => {
  return (
    <TransactionContainer>
      <ImageContainer>
        <img src={transaction.productID.product_image || 'default-product.png'} alt={transaction.productID.product_name} />
      </ImageContainer>
      <TransactionDetails>
        <p><strong>Name:</strong> {transaction.productID.product_name}</p>
        <p><strong>Amount Paid:</strong> ${transaction.amount}</p>
        <p><strong>Date:</strong> {new Date(transaction.date).toLocaleDateString()}</p>
      </TransactionDetails>
    </TransactionContainer>
  );
};

const TransactionContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
  margin-bottom: 10px;
  &:hover {
    background-color: #f9f9f9;
  }
`;

const ImageContainer = styled.div`
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
`;

const TransactionDetails = styled.div`
  margin-left: 20px;
  p {
    margin: 5px 0;
    font-size: 16px;
  }
`;

export default TransactionItem;
