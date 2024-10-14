import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import config from '../../config';

const DeliveryCard = ({ product, buyerDetails, closeModal }) => {
  const [activeTab, setActiveTab] = useState('order');
  const [orderStatus, setOrderStatus] = useState('not_created');
  const [pickupStatus, setPickupStatus] = useState('not_scheduled');
  const [trackingDetails, setTrackingDetails] = useState(null);

  useEffect(() => {
    const fetchDeliveryDetails = async () => {
      try {
        const response = await axios.get(
          `${config.backendUrl}/api/users/shiprocket/delivery/${product._id}`
        );
        const deliveryData = response.data.delivery;
        setOrderStatus(deliveryData.orderStatus);
        setPickupStatus(deliveryData.pickupStatus);
        setTrackingDetails(deliveryData.trackingDetails);
      } catch (error) {
        console.error('Error fetching delivery details:', error);
      }
    };

    fetchDeliveryDetails();
  }, [product._id]);

  const handleCreateOrder = async () => {
    try {
      const response = await axios.post(
        `${config.backendUrl}/api/delivery/shiprocket/create-order`,
        { product, buyerDetails }
      );
      setOrderStatus('created');
      alert('Order created successfully');
      console.log('Order Response:', response);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order');
    }
  };

  const handleSchedulePickup = async () => {
    try {
      const response = await axios.post(
        `${config.backendUrl}/api/delivery/shiprocket/schedule-pickup`,
        { product }
      );
      setPickupStatus('scheduled');
      alert('Pickup scheduled successfully');
      console.log('Pickup scheduled Response:', response);
    } catch (error) {
      console.error('Error scheduling pickup:', error);
      alert('Failed to schedule pickup');
    }
  };

  const handleTrackShipment = async () => {
    try {
      const response = await axios.get(
        `${config.backendUrl}/api/delivery/shiprocket/track/${trackingDetails.shipmentId}`
      );
      setTrackingDetails(response.data);
    } catch (error) {
      console.error('Error tracking shipment:', error);
      alert('Failed to track shipment');
    }
  };

  return (
    <Modal>
      <div className="modal-content">
        {/* Close button stays in top-right corner */}
        <CloseButton id="close-bt" onClick={closeModal}>X</CloseButton>

        {/* Under Construction label placed below */}
        <UnderConstructionLabel>
          ⚠️ Under Construction ⚠️
        </UnderConstructionLabel>

        <h3>Delivery Details for {product.product_name}</h3>

        <Tabs>
          <Tab isActive={activeTab === 'order'} onClick={() => setActiveTab('order')}>
            Order
          </Tab>
          <Tab isActive={activeTab === 'pickup'} onClick={() => setActiveTab('pickup')}>
            Pickup
          </Tab>
          <Tab isActive={activeTab === 'tracking'} onClick={() => setActiveTab('tracking')}>
            Tracking
          </Tab>
        </Tabs>

        <TabContent>
          {activeTab === 'order' && (
            <div className="order-content">
              {orderStatus === 'not_created' ? (
                <>
                  <p>The order has not been created yet for this product. You need to create an order to proceed.</p>
                  <button onClick={handleCreateOrder}>Create Order</button>
                </>
              ) : (
                <p>The order has been created successfully for this product.</p>
              )}
            </div>
          )}

          {activeTab === 'pickup' && (
            <div className="pickup-content">
              {orderStatus !== 'created' ? (
                <p>You need to create an order before scheduling the pickup.</p>
              ) : pickupStatus === 'not_scheduled' ? (
                <>
                  <p>The pickup has not been scheduled yet. Please schedule a pickup to proceed with delivery.</p>
                  <button onClick={handleSchedulePickup}>Schedule Pickup</button>
                </>
              ) : (
                <p>Pickup has been successfully scheduled for this product.</p>
              )}
            </div>
          )}

          {activeTab === 'tracking' && (
            <div className="tracking-content">
              {orderStatus !== 'created' ? (
                <p>You need to create an order before tracking the shipment.</p>
              ) : !trackingDetails ? (
                <>
                  <p>Tracking details are not available yet. Please check back later or update the tracking status.</p>
                  <button onClick={handleTrackShipment}>Track Shipment</button>
                </>
              ) : (
                <div>
                  <h4>Tracking Details</h4>
                  <p>Status: {trackingDetails.status}</p>
                  <p>Expected Delivery: {trackingDetails.expectedDelivery}</p>
                  <button onClick={handleTrackShipment}>Update Tracking</button>
                </div>
              )}
            </div>
          )}
        </TabContent>
      </div>
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
  justify-content: center;
  align-items: center;

  .modal-content {
    position: relative; /* Allows the close button to be positioned inside */
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

    h3 {
      margin-bottom: 20px;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute  !important;
  margin-top: -2rem !important;
  right: -15px !important;
  padding: 5px 10px !important;
  background: red !important; 
  color: white !important;    
  border: none !important;
  font-size: 1.5rem !important;
  cursor: pointer !important;
  z-index: 10 !important; 

 
`;


const UnderConstructionLabel = styled.div`
  background-color: #ffcc00;
  color: black;
  font-weight: bold;
  text-align: center;
  padding: 10px;
   width: 340px;
  margin-top: 20px; /* Adds space below the close button */
  margin-bottom: 20px;
  border-radius: 5px;
  font-size: 1.2rem;
`;


const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  border-top: 1px solid #d3d3d3;
  border-bottom: 1px solid #d3d3d3;
  background-color: #f8f9fa;
  z-index: 9;
`;

const Tab = styled.div`
  flex: 1;
  text-align: center;
  padding: 10px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1.3rem;
  font-weight: 500;
  background-color: ${({ isActive }) => (isActive ? '#8490ff' : 'transparent')};
  color: ${({ isActive, theme }) => (isActive ? theme.colors.black : theme.colors.gray)};
  box-shadow: ${({ isActive }) => (isActive ? 'inset 0 0 5px rgba(0, 0, 0, 0.2)' : 'none')};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.black};
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  }
`;

const TabContent = styled.div`
  .order-content,
  .pickup-content,
  .tracking-content {
    text-align: center;
    margin: 50px;

    p {
      margin: 10px 0;
    }

    button {
      margin-top: 10px;
    }
  }
`;

export default DeliveryCard;
