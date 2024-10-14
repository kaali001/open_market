import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ProductItem from './UserProduct';
import TransactionItem from './UserTransaction';
import config from '../../config';

const UserDetailsModal = ({ user, onClose }) => {
  const [tab, setTab] = useState('details');
  const [userDetails, setUserDetails] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [listedProducts, setListedProducts] = useState([]);
  const [sortOption, setSortOption] = useState('latest');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const [userResponse, transactionsResponse, productsResponse] = await Promise.all([
          axios.get(`${config.backendUrl}/api/users/account/${user._id}`, { withCredentials: true }),
          axios.get(`${config.backendUrl}/api/users/bought-items/${user._id}`, { withCredentials: true }),
          axios.get(`${config.backendUrl}/api/users/listed-items/${user._id}/products`, { withCredentials: true })
        ]);

        setUserDetails(userResponse.data);
        setTransactions(transactionsResponse.data);
        setListedProducts(productsResponse.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (user) fetchUserDetails();
  }, [user]);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <Modal>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        <ProfileHeader>
          <ProfilePic src={userDetails?.profilePic || '/images/avatar.svg'} alt="Profile" />
          <Tabs>
            <Tab onClick={() => setTab('details')} $active={tab === 'details'}>Details</Tab>
            <Tab onClick={() => setTab('transactions')} $active={tab === 'transactions'}>Transactions</Tab>
            <Tab onClick={() => setTab('products')} $active={tab === 'products'}>Products</Tab>
          </Tabs>
        </ProfileHeader>
        <TabContent>
          {tab === 'details' && (
            <DetailsTab>
              <p><strong>Name:</strong> {userDetails?.Name}</p>
              <p><strong>Email:</strong> {userDetails?.email}</p>
              <p><strong>Phone:</strong> {userDetails?.phone}</p>
              <p><strong>Address:</strong> {userDetails?.address}</p>
              <p><strong>Pincode:</strong> {userDetails?.pincode}</p>
            </DetailsTab>
          )}
          {tab === 'transactions' && (
            <TransactionsTab>
              <SortOptions>
                <label>Sort by:</label>
                <select value={sortOption} onChange={handleSortChange}>
                  <option value="latest">Latest</option>
                  <option value="oldest">Oldest</option>
                </select>
              </SortOptions>
              <ScrollableContent>
                {transactions.length ? (
                  transactions.map((transaction) => (
                    <TransactionItem key={transaction._id} transaction={transaction} />
                  ))
                ) : (
                  <div className='empty-card'>
                    <img src='/images/emp-icon.png' className='empty-icon' alt='empty-cart' />
                    <p>No transactions found.</p>
                  </div>
                )}
              </ScrollableContent>
            </TransactionsTab>
          )}
          {tab === 'products' && (
            <ProductsTab>
              <ScrollableContent>
                {listedProducts.length ? (
                  listedProducts.map((product) => (
                    <ProductItem key={product._id} product={product} />
                  ))
                ) : (
                  <div className='empty-card'>
                    <img src='/images/emp-icon.png' className='empty-icon' alt='empty-cart' />
                    <p>No products listed.</p>
                  </div>
                )}
              </ScrollableContent>
            </ProductsTab>
          )}
        </TabContent>
      </ModalContent>
    </Modal>
  );
};

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  width: 80%;
  max-width: 800px;
  max-height: 80%;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #f4f4f4;
  border-bottom: 1px solid #ddd;
`;

const ProfilePic = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 20px;
`;

const Tabs = styled.div`
  display: flex;
`;

const Tab = styled.button`
  padding: 10px;
  cursor: pointer;
  background: ${props => props.$active ? '#3498db' : '#f4f4f4'};
  color: ${props => props.$active ? 'white' : '#3498db'};
  border: none;
  border-radius: 5px;
  margin-right: 10px;
`;

const TabContent = styled.div`
  padding: 20px;
  overflow-y: auto;
  max-height: 400px;
`;

const SortOptions = styled.div`
  margin-bottom: 10px;
  label {
    margin-right: 10px;
  }
`;

const ScrollableContent = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

const DetailsTab = styled.div`
 p{
  margin-bottom:5px;
   }
`;
const TransactionsTab = styled.div`
 .empty-card {
       align-items: center;
       justify-content: center;
       margin-left:42%;
       color:#e4ecf5 ;
      
       .empty-icon{
           width: 120px;
          z-index:-10;
       }
  }
`;
const ProductsTab = styled.div`
 .empty-card {
       align-items: center;
       justify-content: center;
       margin-left:42%;
       color:#e4ecf5 ;
      
       .empty-icon{
           width: 120px;
          z-index:-10;
       }
  }

`;

export default UserDetailsModal;
