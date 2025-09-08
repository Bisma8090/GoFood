import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
  const [orders, setOrders] = useState([]);

  const fetchMyOrder = async () => {
    const email = localStorage.getItem('userEmail');
    if (!email) return;

    try {
      const res = await fetch("https://intuitive-creativity-production.up.railway.app/api/auth/myOrderData", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();

      if (data.orderData && data.orderData.order_data) {
        setOrders(data.orderData.order_data.reverse()); // latest orders first
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='container mt-5'>
        <h2 className='text-center mb-4'>My Orders</h2>

        {orders.length === 0 ? (
          <p className='text-center'>No orders placed yet.</p>
        ) : (
          orders.map((order, idx) => (
            <div key={idx} className='mb-5'>
              <h5>Order Date: {order.Order_date}</h5>
              <div className='row'>
                {order.items.map(item => (
                  <div key={item.id} className='col-12 col-md-6 col-lg-4'>
                    <div className="card mt-3 p-2">
                     
                      <div className="card-body">
                        <h6 className="card-title">{item.name}</h6>
                        <p className="card-text">Quantity: {item.qty}</p>
                        <p className="card-text">Size: {item.size}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <hr />
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
}
