

// src/ProductList.js
import React from "react";
import Product from "./Product";
import styled from "styled-components";
const ProductList = ({ products }) => {
  return (
    <Wrapper>
      <div className="product-grid">
         {products.map((product) => (
               <Product key={product.id} product={product} />
          ))}
     </div>

    </Wrapper>
    
  );
};

const Wrapper= styled.section`

margin-left:30rem;
margin-top:5rem;
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 4rem;
 
  justify-content: center;
}
`;
export default ProductList;
