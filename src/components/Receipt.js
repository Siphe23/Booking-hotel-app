import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../assets/Receipt.css';

const Receipt = () => {
  const location = useLocation();
  const { booking, amount } = location.state || {};

  return (
    <div className="receipt">
      <Navbar />
      <h1>Payment Successful!</h1>
      <h2>Your Receipt</h2>
      <div className="receipt-details">
        <p><strong>Booking Details:</strong></p>
        <p>Email: {booking.email}</p>
        <p>Name: {booking.firstName} {booking.lastName}</p>
        <p>Room Type: {booking.roomsType}</p>
        <p>Number of Persons: {booking.persons}</p>
        <p>Check-In Date: {booking.checkIn}</p>
        <p>Check-Out Date: {booking.checkOut}</p>
        <p><strong>Total Amount Paid: ${amount}</strong></p>
      </div>
      <Footer />
    </div>
  );
};

export default Receipt;
