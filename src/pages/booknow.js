import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, query, where, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../Firebase/firebase'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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
    const [errors, setErrors] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [userBookings, setUserBookings] = useState([]);
    const [editingBooking, setEditingBooking] = useState(null);
    const navigate = useNavigate();

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
                navigate('/login');
            }
        });
        return () => unsubscribe();
    }, [navigate]);

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

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = "First name is required.";
        if (!formData.lastName) newErrors.lastName = "Last name is required.";
        if (!formData.checkIn) newErrors.checkIn = "Check-in date is required.";
        if (!formData.checkOut) newErrors.checkOut = "Check-out date is required.";
        if (new Date(formData.checkIn) >= new Date(formData.checkOut)) {
            newErrors.checkOut = "Check-out date must be after the check-in date.";
        }
        if (formData.persons < 1) newErrors.persons = "At least one person is required.";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setLoading(false);
            return;
        }

        try {
            const bookingData = {
                ...formData,
                totalPrice,
            };

            const docRef = await addDoc(collection(db, "bookings"), {
                ...bookingData,
                timestamp: new Date(),
            });

            alert('Booking successful! Proceed to payment.');

            // Navigate to booking details with the new booking information
            navigate('/bookingDetails', {
                state: {
                    booking: { id: docRef.id, ...bookingData }, // Pass the new booking details
                },
            });

        } catch (error) {
            console.error("Error submitting booking: ", error);
            alert("Failed to submit the booking. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="booknow">
            <Navbar isAuthenticated={isAuthenticated} />
            <div className="booking-container">
                <h2>Book Your Room</h2>
                {isAuthenticated ? (
                    <>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label>Email</label>
                                <input type="email" name="email" value={formData.email} readOnly />
                            </div>
                            <div className="input-group">
                                <label>First Name</label>
                                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                                {errors.firstName && <span className="error">{errors.firstName}</span>}
                            </div>
                            <div className="input-group">
                                <label>Last Name</label>
                                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                                {errors.lastName && <span className="error">{errors.lastName}</span>}
                            </div>
                            <div className="input-group">
                                <label>Number of Persons</label>
                                <input type="number" name="persons" value={formData.persons} onChange={handleChange} min="1" required />
                                {errors.persons && <span className="error">{errors.persons}</span>}
                            </div>
                            <div className="input-group">
                                <label>Room Type</label>
                                <select name="roomsType" value={formData.roomsType} onChange={handleChange} required>
                                    <option value="1">Single</option>
                                    <option value="2">Double</option>
                                    <option value="3">Suite</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label>Check-In Date</label>
                                <input type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} required />
                                {errors.checkIn && <span className="error">{errors.checkIn}</span>}
                            </div>
                            <div className="input-group">
                                <label>Check-Out Date</label>
                                <input type="date" name="checkOut" value={formData.checkOut} onChange={handleChange} required />
                                {errors.checkOut && <span className="error">{errors.checkOut}</span>}
                            </div>
                            <div className="input-group">
                                <label>Total Price: ${totalPrice}</label>
                            </div>
                            <button type="submit" disabled={loading}>
                                Book Now
                            </button>
                        </form>
                    </>
                ) : (
                    <p>Please log in to make a booking.</p>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Booknow;
