// components/admin/UserManagement.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { BiSearch } from "react-icons/bi";
import UserDetailsModal from './UserDetails';
import config from '../../config';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${config.backendUrl}/api/admin/users?page=${page}&search=${search}`,
          { withCredentials: true });
        setUsers(response.data.users);
        setTotalPages(Math.ceil(response.data.total / 10));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [search, page,token]);



  const handleDeleteUsers = async () => {
    try {
      await axios.delete(`${config.backendUrl}/api/admin/users`, { data: { ids: selectedUsers } }, { withCredentials: true });
      setUsers(users.filter((user) => !selectedUsers.includes(user._id)));
      setSelectedUsers([]);
    } catch (error) {
      console.error('Error deleting users:', error);
    }
  };

  
  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <UserContainer>

      <SearchBarContainer>
        <SearchIcon />
          <SearchBar
            type="text"
            placeholder="Search by ID, name, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
         />
      </SearchBarContainer>

      <UserTable>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={(e) =>
                  setSelectedUsers(e.target.checked ? users.map((user) => user._id) : [])
                }
                checked={selectedUsers.length === users.length}
              />
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user._id)}
                  onChange={(e) => setSelectedUsers(prev => e.target.checked ? [...prev, user._id] : prev.filter(id => id !== user._id))}
              
                />
              </td>
              <td>{user._id}</td>
              <td>{user.Name}</td>
              <td>{user.email}</td>
              <td>
              <button onClick={() => handleSelectUser(user)}>View</button>
                <button>Edit</button>
                <button onClick={() => handleDeleteUsers([user._id])}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </UserTable>
      <Pagination>

        {Array.from({ length: totalPages }, (_, index) => (
          <PageButton
            key={index}
            onClick={() => setPage(index + 1)}
            $active={page === index + 1}
          >
            {index + 1}
          </PageButton>
        ))}
      </Pagination>


      {selectedUser && (
        <UserDetailsModal user={selectedUser} onClose={handleCloseModal} />
      )}
    </UserContainer>
  );
};

const UserContainer = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const SearchBarContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

const SearchIcon = styled(BiSearch)`
  position: absolute;
  top: 30%;
  left: 10px;
  font-size: 15px;
  transform: translateY(-50%);
  color: #aaa;
`;

const SearchBar = styled.input`
  width: 25rem;
  padding: 10px 0 10px 35px; 
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 10px;
`;

const UserTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  td {
    font-size: 12px;
  }

  th {
    background-color: #f4f4f4;
    font-size: 13px;
  }

  button {
    padding: 3px 10px;
    margin-right: 5px;
    font-size: 15px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:last-child {
    background-color: #e74c3c;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 10px;
  border: none;
  background-color: ${props => (props.$active ? '#3498db' : '#f4f4f4')};
  color: ${props => (props.$active ? 'white' : '#3498db')};
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #2980b9;
    color: white;
  }
`;

export default UserManagement;
