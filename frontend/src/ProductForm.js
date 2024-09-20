
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
    // product_image:""
  });

  
  const [productImage, setProductImage] = useState(null); // handle image as file
  const [preview, setPreview] = useState(null); 
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user_id = localStorage.getItem("user_id");



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  
 const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
    setPreview(URL.createObjectURL(file)); 
  };



  const handleSubmit = async (e) => {
    e.preventDefault();


    const formData = new FormData();
    formData.append('product_name', productData.product_name);
    formData.append('price', productData.price);
    formData.append('description', productData.description);
    formData.append('origin', productData.origin);
    formData.append('product_image', productImage); // append the file
    formData.append('id', user_id);

   try {
      const response = await axios.post('http://localhost:5000/api/products/add', formData, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'multipart/form-data', // tell server we are sending a file
        },
      });
      navigate("/products");
   
      
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

    <Wrapper>
      <div className="App">
        <div className="form-container">
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
                <input
                  type="file"
                  name="product_image"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleImageChange}
                  required
                />
              </div>
              {error && <div className="error_msg">{error}</div>}
              <button type="submit">Submit</button>
            </form>
          </div>
  
          {/* Image Preview Section */}
          {preview && (
            <div className="preview-section">
              <h3>Preview of Image</h3>
              <img src={preview} alt="Preview" />
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
  
}

const Wrapper = styled.section`
  .App {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: auto;
    margin-top: 2rem;
    background-color: white;
    padding: 1rem;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 900px;
  }

  .form-card {
    background-color: #ffffff;
    padding: 15px;
    border-radius: 10px;
    border: 1px solid #dee2e6;
    width: 100%;
    max-width: 500px;
    text-align: center;
    margin-bottom: 20px;
  }

  .form-group {
    margin-bottom: 10px;
    text-align: center;
  }

  .form-group input,
  .form-group textarea {
    outline: none;
    border: none;
    width: 100%;
    padding: 15px;
    border-radius: 10px;
    background-color: #edf5f3;
    margin: 5px 0;
    font-size: 14px;
    text-transform: none; /* Disable automatic capitalization */
  }

  h2 {
    font-size: 30px;
    margin-bottom: 15px;
  }

  button {
    padding: 12px;
    font-size: 14px;
    width: 100%;
    max-width: 370px;
    color: white;
    background-color: black;
    border-radius: 10px;
    border: none;
    margin-top: 15px;
    cursor: pointer;
  }

  button:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }

  .error_msg {
    color: red;
    margin-top: 10px;
  }

  /* Preview section */
  .preview-section {
    margin-top: 20px;
    text-align: center;
  }

  .preview-section h3 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .preview-section img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    border: 1px solid #dee2e6;
  }

  @media screen and (min-width: 768px) {
    .App {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
    }

    .form-container {
      flex-direction: row;
      justify-content: space-between;
    }

    .form-card {
      max-width: 500px;
    }

    .preview-section {
      margin-left: 30px;
      max-width: 300px;
    }

    .preview-section img {
      width: 100%;
      height: auto;
    }
  }

  @media screen and (max-width: 767px) {
    .form-card,
    .preview-section {
      width: 100%;
      text-align: center;
    }
  }
`;




export default ProductForm;
