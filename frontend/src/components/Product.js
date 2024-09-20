import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Product = ({ product }) => {
  const { _id, product_name, product_image, price } = product;

  return (
    <ProductCard to={`/aboutproduct/${_id}`}>
      <CardImage src={product_image} alt={product_name} />
      <CardBody>
        <ProductName>{product_name}</ProductName>
        {/* <ProductDescription>{description}</ProductDescription> */}
        <Price>Asked Price: ${price}</Price>
      </CardBody>
    </ProductCard>
  );
};

const ProductCard = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
   overflow: hidden;
  &:hover {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  }
  // width: 35rem;
  // max-width: 20rem;
  @media (min-width: 768px) {
    max-width: 100%;
    // margin-left: -2rem;
    padding: 4rem:
  }
`;

const CardImage = styled.img`
  width: 20rem;
  height: 15rem;
  margin-left: 6rem;
  margin-top: 2rem;
`;

const CardBody = styled.div`
  padding: 20px;
  text-align: center;
`;

const ProductName = styled.h2`
  font-size: 18px;
  margin: 10px 0;
`;

// const ProductDescription = styled.p`
//   font-size: 14px;
//   color: #888;
// `;

const Price = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

export default Product;
