import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import image from './kpr.jpeg';
import background from './background.jpg';

function App() {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({ id: '', name: '' });
  const [showOrders, setShowOrders] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder((prevOrder) => ({
      ...prevOrder,
      [name]: name === 'id' && !value ? generateNewOrderId() : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/orders', newOrder);
      fetchOrders();
      setNewOrder({ id: '', name: '' });
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const toggleOrders = () => {
    setShowOrders(!showOrders);
  };

  const generateNewOrderId = () => {
    
    const highestId = orders.reduce((maxId, order) => {
      return order.id > maxId ? order.id : maxId;
    }, 0);

    
    return highestId + 1;
  };

  return (
    <div className="container">
      <center>
        <div>
          <img src={image} alt="image" />
        </div>
      </center>
      <h1>Simple MERN Order Tracking App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="id"
          value={newOrder.id}
          onChange={handleInputChange}
          placeholder="Order ID"
        />
        <input
          type="text"
          name="name"
          value={newOrder.name}
          onChange={handleInputChange}
          placeholder="Order Name"
        />
        <button type="submit">Add Order</button>
      </form>

      
      <button className="orders-button" onClick={toggleOrders}>
        {showOrders ? 'Hide Orders' : 'View Orders'}
      </button>

      
      {showOrders && (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              Order ID: {order.id}, Order Name: {order.name}
            </li>
          ))}
        </ul>
      )}
      <h5 className='kpris'>LEVEL_1 OF KPRIS</h5>
    </div>
  );
}

export default App;
