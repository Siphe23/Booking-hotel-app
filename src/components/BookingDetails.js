import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../assets/BookingDetails.css';
import { db } from '../Firebase/firebase'; 

const BookingDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { booking } = location.state || {}; 

    if (!booking) {
        return <p>No booking details available.</p>;
    }

    const handleProceedToPayment = () => {
        navigate('/paymentForm', {
            state: {
                amount: booking.totalPrice,
                customerEmail: booking.email,
                bookingDetails: booking,
            },
        });
    };

    const handleCancelBooking = async () => {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            try {
                await deleteDoc(doc(db, 'bookings', booking.id)); 
                alert('Booking cancelled successfully!');
                navigate('/'); 
            } catch (error) {
                console.error("Error cancelling booking: ", error);
                alert("Failed to cancel the booking. Please try again.");
            }
        }
    };

    return (
        <div className="booking-details">
            <Navbar />
            <h2>Your Booking Details</h2>
            <p><strong>Name:</strong> {booking.firstName} {booking.lastName}</p>
            <p><strong>Email:</strong> {booking.email}</p>
            <p><strong>Room Type:</strong> {booking.roomType}</p>
            <p><strong>Check-In:</strong> {booking.checkIn}</p>
            <p><strong>Check-Out:</strong> {booking.checkOut}</p>
            <p><strong>Total Price:</strong> ${booking.totalPrice}</p>
            <button onClick={handleProceedToPayment}>Proceed to Payment</button>
            <button onClick={handleCancelBooking}>Cancel Booking</button>
            <Footer />
        </div>
    );
};

export default BookingDetails;
