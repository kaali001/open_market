import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { BiSearch } from "react-icons/bi";
import config from '../../config';


const TransactionManagement = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('latest');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`${config.backendUrl}/api/admin/transactions`, { withCredentials: true });
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [token]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (criteria) => {
    setSortCriteria(criteria);
  };

  const filteredTransactions = transactions
    .filter((transaction) =>
      transaction._id.includes(searchTerm)
    )
    .sort((a, b) => {
      if (sortCriteria === 'latest') {
        return new Date(b.transactionDate) - new Date(a.transactionDate);
      } else if (sortCriteria === 'oldest') {
        return new Date(a.transactionDate) - new Date(b.transactionDate);
      } else if (sortCriteria === 'highest') {
        return b.amount - a.amount;
      }
      return 0;
    });

  return (
    <TransactionContainer>
      <SearchSortContainer>

      <SearchBarContainer>
      <SearchIcon />
        <SearchInput
          type="text"
          placeholder="Search by transaction ID"
          value={searchTerm}
          onChange={handleSearch}
        />
         </SearchBarContainer>

        <SortSelect onChange={(e) => handleSort(e.target.value)} value={sortCriteria}>
          <option value="latest">Sort by Latest Date</option>
          <option value="oldest">Sort by Oldest Date</option>
          <option value="highest">Sort by Highest Amount</option>
        </SortSelect>
      </SearchSortContainer>
      <TransactionTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Buyer</th>
            <th>Seller</th>
            <th>Product</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction._id || 'N/A'}</td>
              <td>{transaction.buyerID?.Name || 'N/A'}</td>
              <td>{transaction.sellerID?.Name || 'N/A'}</td>
              <td>{transaction.productID?.product_name || 'N/A'}</td>
              <td>${transaction.amount != null ? transaction.amount.toFixed(2) : 'N/A'}</td>
              <td>
                {transaction.transactionDate
                  ? new Date(transaction.transactionDate).toLocaleDateString()
                  : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </TransactionTable>
    </TransactionContainer>
  );
};

const TransactionContainer = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const SearchSortContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const SearchBarContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

const SearchIcon = styled(BiSearch)`
  position: absolute;
  top: 40%;
  left: 10px;
  font-size: 15px;
  transform: translateY(-50%);
  color: #aaa;
`;

const SearchInput = styled.input`
 padding: 10px 0 10px 35px; 
  width: 200px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 10px;
`;

const SortSelect = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 12px;
`;

const TransactionTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  td {
    font-size: 10px;
  }
  th {
    background-color: #f4f4f4;
     font-size: 12px;
  }
`;

export default TransactionManagement;
