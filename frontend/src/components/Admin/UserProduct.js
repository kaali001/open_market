
import React from 'react';
import styled from 'styled-components';


// listed products for sell
const ProductItem = ({ product }) => {
  return (
    <ProductContainer>
      <img src={product.product_image || 'default-product.png'} alt={product.product_name} />
      <p>{product.product_name}</p>
      <p>Price: ${product.price}</p>
    </ProductContainer>
  );
};

const ProductContainer = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
  text-align: center;

  img {
    max-width: 100px;
    max-height: 100px;
    object-fit: cover;
  }
`;

export default ProductItem;
