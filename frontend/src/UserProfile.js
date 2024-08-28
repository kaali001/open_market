import React, { useState } from 'react';
import styled from 'styled-components';
import {useNavigate } from 'react-router-dom'; 

import ProductForm from './ProductForm';

const ProfilePageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.lightGray};

  .sidebar {
    width: 20%;
    background-color: ${({ theme }) => theme.colors.white};
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .card-title {
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 10px;
      }

      .card-content {
        font-size: 1.4rem;
        color: ${({ theme }) => theme.colors.gray};
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
  const [activeMenu, setActiveMenu] = useState('Account');
  const navigate = useNavigate();
  const logoutUser = () => {
    window.localStorage.clear();
    navigate("/"); // Redirect to home after logout
  };


  const renderContent = () => {
    switch (activeMenu) {
      case 'Account':
        return (
          <div className="card">
            <div className="card-title">Account Information</div>
            <div className="card-content">Details about your account.</div>
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
            <div className="card-content">Your total expenditure and balance.</div>
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
