import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import * as XLSX from 'xlsx';
import styled from 'styled-components';
import config from '../../config';


const DailyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchOrders = async () => {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      try {
        const response = await axios.get(`${config.backendUrl}/api/admin/orders?date=${formattedDate}`, { withCredentials: true });
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [selectedDate]);

  const downloadExcel = () => {
    const workbook = XLSX.utils.book_new(); 
    const worksheetData = orders.map((order, index) => ({
      'Order No': index + 1,
      'Order ID': order._id,
      'Product ID': order.productID,
      'Seller ID': order.sellerID,
      'Buyer ID': order.buyerID,
      'Amount': order.amount,
      'Date': new Date(order.createdAt).toLocaleDateString(),
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
  
    XLSX.writeFile(workbook, 'orders.xlsx');
  };

  return (
    <Container>
      <CalendarContainer>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy/MM/dd"
          inline
        />
        <DownloadButton onClick={downloadExcel}>Download as Excel</DownloadButton>
      </CalendarContainer>

      <OrdersContainer>
        <h2>Order List</h2>
        <OrderList>
          {orders.map((order) => (
            <OrderItem key={order._id}>
              <p>Order ID: {order._id}</p>
              <p>Product ID: {order.productID}</p>
              <p>Seller ID: {order.sellerID}</p>
              <p>Buyer ID: {order.buyerID}</p>
              <p>Amount: ${order.amount}</p>
              <p>Date: {new Date(order.transactionDate).toLocaleString()}</p>
            </OrderItem>
          ))}
        </OrderList>
      </OrdersContainer>
    </Container>
  );
};

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 20px;
`;

const CalendarContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OrdersContainer = styled.div`
  flex: 2;
  overflow-y: auto;
  max-height: 80vh; // Adjust this value as needed
  padding: 0 10px;
`;

const OrderList = styled.div`
  margin-top: 20px;
`;

const OrderItem = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
`;

const DownloadButton = styled.button`
  margin-top: 20px;
  padding: 8px;
  background-color: #3498db;
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

export default DailyOrders;