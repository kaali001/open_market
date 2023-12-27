
// This page is designed for showing a single product details on clicking on a product.

import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Products from "./Products"; 

const SingleProduct = () => {
  const { id } = useParams();
  const product = Products.find((product) => product.id === parseInt(id, 10));

  if (!product) {
    return <div>Product not found</div>;
  }

  const { name, image, description, price } = product;

  return (
    <ProductContainer>
      <ProductImage src={image} alt={name} />
      <ProductDetails>
        <ProductName>{name}</ProductName>
        <ProductDescription>{description}</ProductDescription>
        <ProductPrice>${price}</ProductPrice>
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

export default SingleProduct;
