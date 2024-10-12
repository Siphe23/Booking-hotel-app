import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../Firebase/firebase';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PaymentForm from '../components/PaymentForm'; // Make sure this is the correct import
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import '../assets/Booknow.css';

function Booknow() {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        persons: 1,
        roomsType: 1,
        checkIn: '',
        checkOut: '',
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [userBookings, setUserBookings] = useState([]);
    const [showPayment, setShowPayment] = useState(false);
    const [editingBooking, setEditingBooking] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    const roomPrices = {
        1: 100,
        2: 150,
        3: 200,
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setIsAuthenticated(true);
                setFormData((prevData) => ({
                    ...prevData,
                    email: user.email,
                }));

                const bookingsQuery = query(
                    collection(db, 'bookings'),
                    where('email', '==', user.email)
                );
                const querySnapshot = await getDocs(bookingsQuery);
                const bookings = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setUserBookings(bookings);
            } else {
                setIsAuthenticated(false);
                setUserBookings([]);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (['roomsType', 'checkIn', 'checkOut', 'persons'].includes(name)) {
            calculatePrice({ ...formData, [name]: value });
        }
    };

    const calculatePrice = (data) => {
        const checkInDate = new Date(data.checkIn);
        const checkOutDate = new Date(data.checkOut);
        const numberOfNights = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);

        if (numberOfNights > 0 && roomPrices[data.roomsType]) {
            const pricePerNight = roomPrices[data.roomsType];
            const total = numberOfNights * pricePerNight * data.persons;
            setTotalPrice(total);
        } else {
            setTotalPrice(0);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!formData.email || !formData.firstName || !formData.lastName || !formData.checkIn || !formData.checkOut) {
            alert("Please fill in all required fields.");
            setLoading(false);
            return;
        }

        if (new Date(formData.checkIn) >= new Date(formData.checkOut)) {
            alert("Check-out date must be after the check-in date.");
            setLoading(false);
            return;
        }

        try {
            if (editingBooking) {
                const bookingRef = doc(db, 'bookings', editingBooking.id);
                await updateDoc(bookingRef, {
                    ...formData,
                    totalPrice,
                });
                alert('Booking updated successfully!');
                setEditingBooking(null);
            } else {
                await addDoc(collection(db, "bookings"), {
                    ...formData,
                    totalPrice,
                    timestamp: new Date(),
                });
                alert('Booking successful! Proceed to payment.');
                setShowPayment(true); // Show payment section
                navigate('/paymentForm'); // Navigate to the PaymentForm page
            }
        } catch (error) {
            console.error("Error submitting booking: ", error);
            alert("Failed to submit the booking. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (booking) => {
        setFormData({
            email: booking.email,
            firstName: booking.firstName,
            lastName: booking.lastName,
            persons: booking.persons,
            roomsType: booking.roomsType,
            checkIn: booking.checkIn,
            checkOut: booking.checkOut,
        });
        setTotalPrice(booking.totalPrice);
        setEditingBooking(booking);
        setShowPayment(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this booking?')) {
            try {
                await deleteDoc(doc(db, 'bookings', id));
                setUserBookings(userBookings.filter((booking) => booking.id !== id));
                alert('Booking deleted successfully!');
            } catch (error) {
                console.error("Error deleting booking: ", error);
                alert("Failed to delete the booking. Please try again.");
            }
        }
    };

    const resetForm = () => {
        setFormData({
            email: formData.email,
            firstName: '',
            lastName: '',
            persons: 1,
            roomsType: 1,
            checkIn: '',
            checkOut: '',
        });
        setTotalPrice(0);
        setShowPayment(false);
        setEditingBooking(null);
    };

    return (
        <div className="booknow">
            <Navbar />
            <div className="booking-container">
                <h2>Book Your Room</h2>
                {isAuthenticated ? (
                    <>
                        <form className="booking-form" onSubmit={handleSubmit}>
                            <div className="name-fields">
                                <div className="input-group">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="First Name"
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Last Name"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="input-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    required
                                    readOnly
                                />
                            </div>
                            <div className="input-group">
                                <label>Number of Persons</label>
                                <input
                                    type="number"
                                    name="persons"
                                    value={formData.persons}
                                    onChange={handleChange}
                                    placeholder="Number of Persons"
                                    min="1"
                                />
                            </div>
                            <div className="input-group">
                                <label>Room Type (1-3)</label>
                                <input
                                    type="number"
                                    name="roomsType"
                                    value={formData.roomsType}
                                    onChange={handleChange}
                                    placeholder="Room Type (1-3)"
                                    min="1"
                                    max="3"
                                />
                            </div>
                            <div className="input-group">
                                <label>Check-in Date</label>
                                <input
                                    type="date"
                                    name="checkIn"
                                    value={formData.checkIn}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label>Check-out Date</label>
                                <input
                                    type="date"
                                    name="checkOut"
                                    value={formData.checkOut}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" disabled={loading}>
                                {loading ? 'Submitting...' : editingBooking ? 'Update Booking' : 'Book Now'}
                            </button>
                        </form>
                        {showPayment && (
                            <div className="payment-section">
                                <h3>Total Price: R{totalPrice.toFixed(2)}</h3>
                                <PaymentForm totalPrice={totalPrice} email={formData.email} resetForm={resetForm} />
                            </div>
                        )}
                    </>
                ) : (
                    <div>
                        <p>Please log in to book a room.</p>
                    </div>
                )}
                <h3>Your Bookings</h3>
                <ul className="booking-list">
                    {userBookings.map((booking) => (
                        <li key={booking.id}>
                            <span>{booking.firstName} {booking.lastName}</span>
                            <span> - Room Type: {booking.roomsType}</span>
                            <span> - Total Price: R{booking.totalPrice.toFixed(2)}</span>
                            <button onClick={() => handleEdit(booking)}>Edit</button>
                            <button onClick={() => handleDelete(booking.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
            <Footer />
        </div>
    );
}

export default Booknow;
   