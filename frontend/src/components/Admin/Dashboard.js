
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import config from '../../config';


// Register the required components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');


  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${config.backendUrl}/api/admin/statistics`,{ withCredentials: true });
        setStats(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchStats();
  }, [token]);

  if (loading) return <div>Loading...</div>;

  const data = {
    labels: stats.userRegistrations.map((reg) => reg._id),
    datasets: [
      {
        label: 'User Registrations',
        data: stats.userRegistrations.map((reg) => reg.count),
        borderColor: '#3498db',
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Users',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'User Registrations Over Time',
      },
    },
  };

  const customData = {
    ...data,
    datasets: data.datasets.map((dataset, index) => ({
      ...dataset,
      backgroundColor: `rgba(${index * 50 + 100}, ${index * 100 + 50}, 200, 0.2)`,
      borderColor: `rgba(${index * 50 + 100}, ${index * 100 + 50}, 200, 1)`,
      pointBackgroundColor: `rgba(${index * 50 + 100}, ${index * 100 + 50}, 200, 1)`,
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: `rgba(${index * 50 + 100}, ${index * 100 + 50}, 200, 1)`,
    })),
  };

  return (
    <DashboardContainer>
      <StatBox type="primary">
        <h3>Total Users</h3>
        <p>{stats.totalUsers}</p>
      </StatBox>
      <StatBox type="warning">
        <h3>Active Users</h3>
        <p>{stats.activeUsers}</p>
      </StatBox>
      <StatBox type="success">
        <h3>Total Profit</h3>
        <p>${stats.totalProfit.toFixed(2)}</p>
      </StatBox>
      <StatBox type="info">
        <h3>Total Transactions</h3>
        <p>{stats.totalTransactions}</p>
      </StatBox>
      <GraphContainer>
      <Line data={customData} options={options} />
      </GraphContainer>
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  background-color: #f7f7f7; /* Light gray background */
  padding: 20px;
`;

const StatBox = styled.div`
  flex: 1;
  min-width: 200px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  h3 {
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: normal;
    color: rgba(255, 255, 255, 0.8); /* Light text for better contrast */
  }

  p {
    font-size: 26px;
    font-weight: bold;
    margin: 0;
    color: #fff; /* Green color for profit text */
  }

  ${({ type }) => {
    switch (type) {
      case "primary":
        return `
          background-color: #3498db; /* Blue background */
          color: #fff;
        `;
      case "success":
        return `
          background-color: #2ecc71; /* Green background */
          color: #fff;
        `;
      case "warning":
        return `
          background-color: #0ea5e9; /* Yellow background */
          color: #fff;
        `;
      case "info":
        return `
          background-color: #9b59b6; /* Purple background */
          color: #fff;
        `;
      default:
        return `
          background-color: #fff; /* Default white background */
          color: #333; /* Dark text for contrast */
        `;
    }
  }}

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  }
`;

const GraphContainer = styled.div`
  flex: 1;
  width: 100%;
  padding: 20px;
  background-color: #ffffff; /* White background */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

export default Dashboard;