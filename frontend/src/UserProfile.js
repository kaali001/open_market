import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {useNavigate } from 'react-router-dom'; 
import { FaPen } from 'react-icons/fa';
import ProductForm from './ProductForm';

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
    // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
    //  text-align: left;
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
      // box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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
          // margin-left:30rem;
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
`;



const UserProfilePage = () => {

  const userId = localStorage.getItem("user_id"); 
  const token = localStorage.getItem('token');

  const [activeMenu, setActiveMenu] = useState('Account');
  const [userDetails, setUserDetails] = useState({});
  const [boughtItems, setBoughtItems] = useState([]);
  const [balance, setBalance] = useState(0);
  const [amountToAdd, setAmountToAdd] = useState(500);

  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const logoutUser = () => {
    window.localStorage.clear();
    navigate("/"); 
  };


  useEffect(() => {
    fetchContent();
  }, [activeMenu]);

  const fetchContent = async () => {
  
    if (activeMenu === 'Account') {
      const response = await axios.get(`http://localhost:5000/api/users/account/${userId}`,
        {
         headers: {
           'x-auth-token': token,
          }
       }
      );
      setUserDetails(response.data);
    } else if (activeMenu === 'Bought items') {
      const response = await axios.get(`http://localhost:5000/api/users/bought-items/${userId}`,
        {
          headers: {
             'x-auth-token': token,
           }
        }
      );
      setBoughtItems(response.data);
    } else if (activeMenu === 'Balance') {
      const response = await axios.get(`http://localhost:5000/api/users/balance/${userId}`,
        {
         headers: {
            'x-auth-token': token,
          }
        }
      );
      setBalance(response.data.balance);
    }
  };

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
  
    await axios.patch(`http://localhost:5000/api/users/account/${userId}`, userDetails,
      {
        headers: {
          'x-auth-token': token,
         }
      }
    );
    setIsEditing(false);
  };


  const handleAddBalance = async (amount) => {
    await axios.post(`http://localhost:5000/api/users/balance/${userId}`, { amount },
      {
        headers: {
          'x-auth-token': token,
         }
      }
    );
    fetchContent();
  };


const handlePayment = async () => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const result = await fetch('http://localhost:5000/api/users/payment/create-order', {
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
        const verifyUrl = 'http://localhost:5000/api/users/payment/verify-payment';
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
            <div className="card-content">List of items you have purchased.</div>
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
          <div className="card">
            <div className="card-title">Sell Items</div>
            <div className="card-content"><ProductForm/></div>
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
        <div className="username">John Doe</div>
        
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
