import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {useNavigate } from 'react-router-dom'; 
import { FaPen } from 'react-icons/fa';
import ProductForm from './ProductForm';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import DeliveryCard from './components/UserPage/DeliveryCard';
import config from './config';

// Load Razorpay script dynamically
const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};



const ProfilePageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.lightGray};
 
  .sidebar {
    width: 20%;
    background-color: ${({ theme }) => theme.colors.white};
    padding: 20px;
     border: 1px solid #dee2e6;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center; /* Center the content horizontally */

    .profile-pic {
      width: 80px;
      
      border-radius: 50%;
      margin-bottom: 20px;
      object-fit: cover;
    }

    .username {
      font-size: 1.5rem;
      font-family: inherit;
      font-weight: bold;
      margin-bottom: 4rem;
      text-align: center;
    }

    .menu-item {
      margin-bottom: 15px;
      font-size: 1.6rem;
      color: ${({ theme }) => theme.colors.black};
      cursor: pointer;
      padding: 10px 20px;
      justify-content: center;
      align-items:left;
      border-radius: 8px;
      width: 100%; /* Full width for better button-like appearance */
      box-sizing: border-box;

      &:hover {
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.black};
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      }

      &.active {
        background-color: #e8edff;
        color: ${({ theme }) => theme.colors.black};
        
      }
    }

    .logout{
    margin: 30px 0 10px 0;
      font-size: 1.6rem;
      color: ${({ theme }) => theme.colors.white};
      cursor: pointer;
      padding: 10px 20px;
      text-align: center;
      border-radius: 8px;
      width: 100%; 
      box-sizing: border-box;
      background-color:#f53643;

    }
  }

  .content {
    width: 75%;
    padding-left: 40px;
  .card {
      background-color: ${({ theme }) => theme.colors.white};
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #dee2e6;
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .card-header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        .Account-card-title {
          font-size: 2rem;
          font-weight: bold;
          margin-left:30rem;
          margin-bottom: 30px;
        }

        .edit-icon {
          cursor: pointer;
          
        }
      }

      .card-title {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 30px;
        }

      .form-card-content {
        font-size: 1.4rem;
        color: ${({ theme }) => theme.colors.gray};
        width: 100%;
        padding-left:20rem;

        
        .form-field {
          margin-bottom: 15px;
          display: flex;
          flex-direction: column;
          box-shadow: none;

          label {
            font-weight: bold;
            margin-bottom: 5px;
          }

          input {
            outline: none;
	          border: none;
            padding: 10px;
            border-radius: 5px;
            
            font-size: 1.4rem;
          }

          input[disabled] {
            background-color: #edf5f3;
          }
        }
      }

     .add-balance-section {
        margin-top: 20px;
        text-align: center;

        input {
          padding: 10px;
          font-size: 1.4rem;
          margin-right: 10px;
        }

        button {
          padding: 10px 20px;
          font-size: 1.4rem;
          background-color: rgb(98 84 243);
          color: ${({ theme }) => theme.colors.white};
          border: none;
          border-radius: 5px;
          cursor: pointer;

          &:hover {
            background-color: ${({ theme }) => theme.colors.darkPrimary};
          }
        }
      }
     .item-card {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          border: 1px solid #ddd;
          padding: 10px;
          border-radius: 8px;

        .createdAt {
          margin-left:200px;
        }
        .item-image {
          width: 100px;
          height: 100px;
          margin-right: 25px;
          object-fit: cover;
          border-radius: 8px;
        }

        .item-details {
          flex: 1;
        }

        .item-details p {
          margin: 5px 0;
        }
     }
     
     .empty-card {
       align-items: center;
       justify-content: center;
       padding:130px 0;
       color:#e4ecf5 ;
      
       .empty-icon{
           width: 120px;
          z-index:-10;
       }


     
     
     }
    }
  }
  @media (max-width: 768px) {
    flex-direction: column;

    .sidebar {
      width: 100%;
      margin-bottom: 20px;
    }

    .content {
      width: 100%;
      padding-left: 0;
    }
  }

    .tabs {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    border-radius: 8px;
    border-bottom: 1px solid var(--hairline-color, #d3d3d3);

    .tab {
      flex: 1;
      text-align: center;
      padding: 10px;
      margin:0 5px;
      cursor: pointer;
      border-radius: 5px;
      font-size: 1.3rem;
      font-weight: 500;
      letter-spacing: 0.0178571em;
      line-height: 1.25rem;

      &:hover {
        background-color: ${({ theme }) => theme.colors.primaryLight};
      }

      &.active {
        color: #1c3ee9;
        border-bottom: 3px solid var(--hairline-color, #1c3ee9);
      }
    }
  }

  .product-card {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 8px;
    width:500px;
    img {
      width: 100px;
      height: 100px;
      margin-right: 15px;
      object-fit: cover;
      border-radius: 8px;
    }

    div {
      flex: 1;
      margin-left:15px;
    }

    p {
      margin: 5px 0;
    }
  }

.sold-items {
  .buyer-details-card {
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    z-index: 1000;
    width: 80%;
    max-width: 500px; 
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
  }

  .buyer-details-card p {
    margin: 5px 0;
  }

  button {
    margin-top: 10px;
    margin-right:15px;
    padding: 6px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }

  #close-btn {
    position: absolute;
    top: -8px;
    right: -16px;
    background: red;
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }

}



  @media (max-width: 768px) {
    .tabs {
      flex-direction: column;
      .tab {
        margin-bottom: 10px;
      }
    }
  }
`;



const UserProfilePage = () => {

  const userId = localStorage.getItem("user_id"); 
  const token = localStorage.getItem('token');

  const [activeMenu, setActiveMenu] = useState('Account');
  const [activeTab, setActiveTab] = useState('Add Product');
  const [userDetails, setUserDetails] = useState({});
  const [boughtItems, setBoughtItems] = useState([]);
  const [balance, setBalance] = useState(0);
  const [amountToAdd, setAmountToAdd] = useState(500);
  const [listedProducts, setListedProducts] = useState([]);
  const [soldItems, setSoldItems] = useState([]); 
  const [buyerDetails, setBuyerDetails] = useState(null);
  const [showDeliveryCard, setShowDeliveryCard] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedBuyerDetails, setSelectedBuyerDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const logoutUser = () => {
    window.localStorage.clear();
    navigate("/"); 
  };



  const fetchContent = useCallback(async () => {
    if (activeMenu === 'Account') {
      const response = await axios.get(`${config.backendUrl}/api/users/account/${userId}`,
        {
         headers: {
           'x-auth-token': token,
          }
       }
      );
      setUserDetails(response.data);
    } else if (activeMenu === 'Bought items') {
      const response = await axios.get(`${config.backendUrl}/api/users/bought-items/${userId}`,
        {
          headers: {
             'x-auth-token': token,
           }
        }
      );
      setBoughtItems(response.data);
    } else if (activeMenu === 'Balance') {
      const response = await axios.get(`${config.backendUrl}/api/users/balance/${userId}`,
        {
         headers: {
            'x-auth-token': token,
          }
        }
      );
      setBalance(response.data.balance);
    }
  }, [activeMenu, token, userId]);


  useEffect(() => {
    fetchContent();
  }, [fetchContent]);



  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleFormChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveDetails = async () => {
  
    await axios.patch(`${config.backendUrl}/api/users/account/${userId}`, userDetails,
      {
        headers: {
          'x-auth-token': token,
         }
      }
    );
    setIsEditing(false);
  };


const handlePayment = async () => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const result = await fetch(`${config.backendUrl}/api/users/payment/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      body: JSON.stringify({ amount: amountToAdd }),
    });

    const { order } = await result.json();

    if (!order) {
      alert('Server error. Are you online?');
      return;
    }

    const options = {
      key: process.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: 'INR',
      name: 'U-mart',
      description: 'Add Balance to Account',
      order_id: order.id,
      handler: async function (response) {
        const verifyUrl = `${config.backendUrl}/api/users/payment/verify-payment`;
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

        const data = {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          amount: amountToAdd,
        };

        const verifyResponse = await fetch(verifyUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
          body: JSON.stringify(data),
        });

        const result = await verifyResponse.json();

        if (result.success) {
          alert('Payment successful and balance updated!');
          setBalance(balance + parseInt(amountToAdd)); // Update balance in UI
          setAmountToAdd(500);
        } else {
          alert('Payment verification failed!');
        }
      },
      prefill: {
        name: userDetails.Name,
        email: userDetails.email,
        contact: userDetails.phone, 
      },
      theme: {
        color: '#2a7bf5',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };


  // Fetching listed products
  const fetchListedProducts = useCallback(async () => {
    const response = await axios.get(`${config.backendUrl}/api/users/listed-items/${userId}/products`, {
      headers: { 'x-auth-token': token }
    });
    setListedProducts(response.data);
  }, [token, userId]);


  // Fetching sold items
  const fetchSoldItems = useCallback(async () => {
    const response = await axios.get(`${config.backendUrl}/api/users/sold-items/${userId}/products`, {
      headers: { 'x-auth-token': token }
    });
    setSoldItems(response.data);
  }, [token, userId]);


  //fetching buyer details of a listed product
  const fetchBuyerDetails = async (buyerID, productID, amount) => {
    try {
      const response = await axios.get(`${config.backendUrl}/api/users/buyer-details/${buyerID}`,{
        headers:{'x-auth-token': token}
      });
      setBuyerDetails({
        buyer: response.data,
        product: productID, 
        item: amount,
      });
    } catch (error) {
      console.error('Error fetching buyer details:', error);
    }
  };


  const downloadPDF = () => {
    const doc = new jsPDF();

    // Buyer Information
    doc.text('Buyer Details', 14, 16);
    doc.autoTable({
      startY: 20,
      body: [
        ['Buyer Name', buyerDetails.buyer.Name],
        ['Email', buyerDetails.buyer.email],
        ['Phone', buyerDetails.buyer.phone],
        ['Address', buyerDetails.buyer.address],
        ['Pincode', buyerDetails.buyer.pincode],
      ]
    });

    // Product Information
    doc.text('Product Details', 14, doc.autoTable.previous.finalY + 10);
    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 15,
      body: [
        ['Product Name', buyerDetails.product.product_name],
        ['Bought At', `$${buyerDetails.item}`],
        ['Product Quantity', '1'],
        ['Total Amount', `$${buyerDetails.item}`],
      ]
    });

    
    doc.save(`buyer-details-${buyerDetails.name}.pdf`);
  };


  const handleOpenDeliveryCard = async (product, buyer,amount) => {
   
    try {
      const response = await axios.get(`${config.backendUrl}/api/users/buyer-details/${buyer}`,{
        headers:{'x-auth-token': token}
      });

      setSelectedBuyerDetails({
        buyerdata: response.data,
        Amount: amount,

      });
     
    } catch (error) {
      console.error('Error fetching buyer details:', error);
    }
  
    setSelectedProduct(product);
    
    setShowDeliveryCard(true);
  };
  
  const handleCloseDeliveryCard = () => {
    setShowDeliveryCard(false);
  };



  const renderSellItemsTab = () => {
    switch (activeTab) {
      case 'Add Product':
        return <ProductForm />; 
      case 'Listed Products':
        return (
          <div>
        
            {listedProducts.length > 0 ? (
              listedProducts.map((product) => (
                <div key={product._id} className="product-card">
                  <img src={product.product_image} alt={product.product_name} />
                  <div>
                    <p><strong>{product.product_name}</strong></p>
                    <p>Price: ${product.price}</p>
                    <p>Status: {product.availability ? 'Available' : 'Sold'}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No products listed yet.</p>
            )}
          </div>
        );
      case 'Sold Items':
        return (
          <div className='sold-items'>
            {soldItems.length > 0 ? (
              soldItems.map((item) => (
                <div key={item._id} className="product-card">
                  <img src={item.productID.product_image} alt={item.productID.product_name} />
                  <div>
                    <p><strong>{item.productID.product_name}</strong></p>
                    <p>Sold for: ${item.amount}</p>
                    <p>Date Sold: {new Date(item.transactionDate).toLocaleDateString()}</p>
                    <button onClick={() => fetchBuyerDetails(item.buyerID, item.productID,item.amount)}>Buyer Details</button>
                    <button onClick={() => handleOpenDeliveryCard(item.productID, item.buyerID, item.amount)}>Deliver</button>
                  </div>

                </div>
              ))
            ) : (
              <p>No items sold yet.</p>
            )}

            {/*it Display Buyer Details Card */}
            {buyerDetails && buyerDetails.buyer && buyerDetails.product && buyerDetails.item &&(
              <div className="buyer-details-card">
                <button id="close-btn" onClick={() => setBuyerDetails(null)}>X</button>
                <p><strong>Buyer Name:</strong> {buyerDetails.buyer.Name}</p>
                <p><strong>Email:</strong> {buyerDetails.buyer.email}</p>
                <p><strong>Phone:</strong> {buyerDetails.buyer.phone}</p>
                <p><strong>Address:</strong> {buyerDetails.buyer.address}</p>
                <p><strong>Pincode:</strong> {buyerDetails.buyer.pincode}</p>

                <p><strong>Product Name:</strong> {buyerDetails.product.product_name}</p>
                <p><strong>Bought At:</strong> ${buyerDetails.item}</p>
                <p><strong>Quantity: </strong>1</p>
                <p><strong>Total Amount:</strong> ${buyerDetails.item}</p>

                <button onClick={downloadPDF}>Download as PDF</button>
              </div>
            )}

            
            {showDeliveryCard && (
              <DeliveryCard
                product={selectedProduct}
                buyerDetails={selectedBuyerDetails}
                closeModal={handleCloseDeliveryCard}
              />
            )}

          </div>
        );
      default:
        return null;
    }
  };
  

  useEffect(() => {
    if (activeMenu === 'Sell items' && activeTab === 'Listed Products') {
      fetchListedProducts();
    } else if (activeMenu === 'Sell items' && activeTab === 'Sold Items') {
      fetchSoldItems();
    }
  }, [activeMenu, activeTab, fetchListedProducts, fetchSoldItems]);



  const renderContent = () => {
    switch (activeMenu) {
      case 'Account':
        return (
          <div className="card">
            <div className="card-header">
              <div className="Account-card-title">Account Information</div>
              <FaPen   className="edit-icon"
                onClick={handleEditToggle}
              />
            </div>
            <div className="form-card-content">
              <div className="form-field">
                <label>Name</label>
                <input
                  type="text"
                  name="Name"
                  value={userDetails.Name || ''}
                  onChange={handleFormChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-field">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={userDetails.email || ''}
                  disabled
                />
              </div>
              <div className="form-field">
                <label>Phone</label>
                <input
                  type="Numeric"
                  name="phone"
                  value={userDetails.phone || ''}
                  onChange={handleFormChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-field">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={userDetails.address || ''}
                  onChange={handleFormChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-field">
                <label>Pincode</label>
                <input
                  type="Numeric"
                  name="pincode"
                  value={userDetails.pincode || ''}
                  onChange={handleFormChange}
                  disabled={!isEditing}
                />
              </div>

              {isEditing && (
                <button onClick={handleSaveDetails}>
                  Save
                </button>
              )}
            </div>
          </div>
        );
      case 'Bought items':
        return (
          <div className="card">
            <div className="card-title">Bought Items</div>
            <div className="card-content">
        {boughtItems.length > 0 ? (
          boughtItems.map((item, index) => (
            <div key={index} className="item-card">
              <img src={item.productID.product_image} alt={item.productID.product_name} className="item-image" />
              <div className="item-details">
                <p><strong>Item:</strong> {item.productID.product_name}</p>
                <p><strong>Asked Price:</strong> ${item.productID.price}</p>
                <p><strong>Closing Bid:</strong> ${item.amount}</p>
                <span className="createdAt"> {new Date(item.transactionDate).toLocaleString()}</span>
              </div>
            </div>
          ))
        ) : (
          <div className='empty-card'>
         
          <img src='/images/emp-icon.png' className='empty-icon' alt='empty-cart' />
          <p>No items bought yet.</p>
          </div>
        )}
      </div>
    </div>
  );
      case 'Balance':
        return (
          <div className="card">
            <div className="card-title">Your Balance</div>
            <div className="card-content">
              <p>Your Current Balance: ₹{balance}</p>
              <div className="add-balance-section">
                <input
                  type="Numeric"
                  value={amountToAdd}
                  onChange={(e) => setAmountToAdd(e.target.value)}
                  placeholder="Enter amount"
                />
                <button onClick={handlePayment}>Add Balance</button>
              </div>
            </div>
          </div>
        );
      case 'Sell items':
        return (
          <div className="sell-items-section">
            <div className="tabs">
              <div className={`tab ${activeTab === 'Add Product' ? 'active' : ''}`} onClick={() => setActiveTab('Add Product')}>
                Add Product
              </div>
              <div className={`tab ${activeTab === 'Listed Products' ? 'active' : ''}`} onClick={() => setActiveTab('Listed Products')}>
                Listed Products
              </div>
              <div className={`tab ${activeTab === 'Sold Items' ? 'active' : ''}`} onClick={() => setActiveTab('Sold Items')}>
                Sold Items
              </div>
            </div>
            <div className="card">
              {renderSellItemsTab()}
            </div>
          </div>


        );
      
      default:
      return null;
    }
  };

  return (
    <ProfilePageWrapper>
      <div className="sidebar">
        <img src='/images/avatar.svg' alt="Profile Pic" className="profile-pic" />
        <div className="username">{userDetails.Name}</div>
        
        <div className={`menu-item ${activeMenu === 'Account' ? 'active' : ''}`} onClick={() => setActiveMenu('Account')}>Account</div>
        <div className={`menu-item ${activeMenu === 'Bought items' ? 'active' : ''}`} onClick={() => setActiveMenu('Bought items')}>Bought items</div>
        <div className={`menu-item ${activeMenu === 'Balance' ? 'active' : ''}`} onClick={() => setActiveMenu('Balance')}>Balance</div>
        <div className={`menu-item ${activeMenu === 'Sell items' ? 'active' : ''}`} onClick={() => setActiveMenu('Sell items')}>Sell items</div>
        <div className="logout" onClick={logoutUser}>Logout</div>
      </div>
      <div className="content">
        {renderContent()}
      </div>
    </ProfilePageWrapper>
  );
};

export default UserProfilePage;
