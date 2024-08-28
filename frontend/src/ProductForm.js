
import React, { useState } from "react";
import styled from "styled-components"; 
import axios from 'axios';
import {useNavigate } from "react-router-dom";

function ProductForm() {
  const [productData, setProductData] = useState({
    product_name: "",
    price:"",
    description: "",
    origin: "",
    product_image:""
  });

  // const user = localStorage.getItem("token");
  const [error, setError] = useState("");
	const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/products',{productData,"id": user_id}
    );
      navigate("/products");
      console.log('Product added:', response.data);
      if (response.ok) {
        alert("Product details uploaded successfully!");
        // Reset the form
        // setProductData({
        //   product_name: "",
        //   price: "",
        //   description: "",
        //   origin: "",
        //   image: ""
        // });
      } else {
        console.error("Error uploading product details");
      }
    } catch (error) {
      if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
    }
  };

  return (
    // console.log(user),

    <Wrapper>

      <div className="App">
      <div className="form-card">
        <h2>Product Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            
            <input
              type="text"
              name="product_name"
              placeholder="Product name"
              value={productData.product_name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
          
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={productData.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            
            <textarea
              name="description"
              placeholder="Description"
              value={productData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
          
            <input
              type="text"
              name="origin"
              placeholder="Origin"
              value={productData.origin}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            
            <input type="text"
               name="product_image"
               placeholder="Image link"
               value={productData.product_image}
               onChange={handleInputChange} 
               required
              />
          </div>
          {error && <div className={"error_msg"}>{error}</div>}
          <button type="submit">Submit</button>
        </form>
      </div>
      </div>

    </Wrapper>
  );
}

const Wrapper = styled.section`



.App {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
  margin-top:2rem;
  
 
  background-color: white;
}

.form-card {
  background-color: #ffffff;
  padding: 15px;
  border-radius: 10px;
	box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%),
		0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);
  ${'' /* height:50rem; */}
  width: 100%;
  max-width: 500px; 
  margin: 0 auto;
  text-align: center;
}

.form-group {
  margin-bottom: 5px;
  text-align: center;
}



.form-group input,
.form-group textarea,
.form-group select {
  outline: none;
	border: none;
	width: 370px;
	padding: 15px;
	border-radius: 10px;
	background-color: #edf5f3;
	margin: 5px 0;
	font-size: 14px;
}


h2{
  font-size: 30px;
  align-self: center;
  margin-bottom:2rem;
}
button {
  background-color: rgb(98 84 243);
	color: white;
  border: none;
  border-radius: 20px;
  width: 180px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  margin-top:1rem;
}

button:hover {
  background-color: #0056b3;
}

@media screen and (min-width: 768px) {
  .form-card {
    padding: 30px;
  }

  h2 {
    font-size: 40px;
  }
}

`;



export default ProductForm;
