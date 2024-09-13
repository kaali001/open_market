// pages/Admin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Dashboard from './components/Admin/Dashboard';
import UserManagement from './components/Admin/UserManagement';
import TransactionManagement from './components/Admin/TransactionManagement';
import { FaTachometerAlt, FaUsers, FaMoneyCheckAlt, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Importing icons


const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  
  const logoutUser = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/logout', {
        method: 'POST',
        credentials: 'include', 
      });

      if (response.ok) {
      
        window.localStorage.clear();
        navigate("/"); 
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };


  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UserManagement />;
      case 'transactions':
        return <TransactionManagement />;
      case 'settings':
        return <div>Settings</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AdminContainer>
      <Sidebar>
        <SidebarItem onClick={() => setActiveTab('dashboard')} $active={activeTab === 'dashboard'}>
          <FaTachometerAlt />
          <span>Dashboard</span>
        </SidebarItem>
        <SidebarItem onClick={() => setActiveTab('users')} $active={activeTab === 'users'}>
          <FaUsers />
          <span>Users</span>
        </SidebarItem>
        <SidebarItem onClick={() => setActiveTab('transactions')} $active={activeTab === 'transactions'}>
          <FaMoneyCheckAlt />
          <span>Transactions</span>
        </SidebarItem>
        <SidebarItem onClick={() => setActiveTab('settings')} $active={activeTab === 'settings'}>
          <FaCog />
          <span>Settings</span>
        </SidebarItem>
        <LogoutItem onClick={logoutUser}>
          <FaSignOutAlt />
          <span>Logout</span>
        </LogoutItem>
      </Sidebar>
      <Content>{renderContent()}</Content>
    </AdminContainer>
  );
};

const AdminContainer = styled.div`
  display: flex;
  height: 90vh;
  background-color: #ecf0f1;
`;

const Sidebar = styled.div`
  width: 200px;
   height: 88vh;
  background-color: #2c3e50;
  color: white;
  display: flex;
  
  flex-direction: column;
  padding-top: 20px;

  @media (max-width: 768px) {
    width: 60px;
    padding-top: 10px;
  }
`;

const SidebarItem = styled.div`
  padding: 15px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 16px;
  background-color: ${(props) => (props.active ? '#34495e' : 'transparent')};

  &:hover {
    background-color: #34495e;
  }

  svg {
    margin-right: 10px;
    font-size: 20px;
  }

  span {
    @media (max-width: 768px) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    padding: 10px;
    justify-content: center;

    svg {
      font-size: 24px;
      margin: 0;
    }
  }
`;

const LogoutItem = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 16px;
  background-color: #f53643;
  margin-top: auto;

  &:hover {
    background-color: #d32f2f;
  }

  svg {
    margin-right: 10px;
    font-size: 20px;
  }

  span {
    @media (max-width: 768px) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    padding: 10px;
    justify-content: center;

    svg {
      font-size: 24px;
      margin: 0;
    }
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #ecf0f1;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export default Admin;