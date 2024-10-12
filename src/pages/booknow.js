import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../Firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';
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

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user);
        });
        return () => unsubscribe();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        // Form validation
        if (!formData.email || !formData.firstName || !formData.lastName || !formData.checkIn || !formData.checkOut) {
            alert("Please fill in all required fields.");
            setLoading(false); // Stop loading
            return;
        }

        if (new Date(formData.checkIn) >= new Date(formData.checkOut)) {
            alert("Check-out date must be after the check-in date.");
            setLoading(false); // Stop loading
            return;
        }

        try {
            await addDoc(collection(db, "bookings"), {
                ...formData,
                timestamp: new Date(),
            });

            alert("Booking successful!");
            setFormData({ email: '', firstName: '', lastName: '', persons: 1, roomsType: 1, checkIn: '', checkOut: '' });
        } catch (error) {
            console.error("Error submitting booking: ", error);
            alert("Failed to submit the booking. Please try again.");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className='booknow'>
            <Navbar />
            <h1>Book Now</h1>
            {isAuthenticated ? (
                <form onSubmit={handleSubmit}>
                    {/* First Name */}
                    <div className="form-group">
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

                    {/* Last Name */}
                    <div className="form-group">
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

                    {/* Email */}
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                        />
                    </div>

                    {/* Number of Persons */}
                    <div className="form-group">
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

                    {/* Room Type */}
                    <div className="form-group">
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

                    {/* Check-in Date */}
                    <div className="form-group">
                        <label>Check-in Date</label>
                        <input
                            type="date"
                            name="checkIn"
                            value={formData.checkIn}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Check-out Date */}
                    <div className="form-group">
                        <label>Check-out Date</label>
                        <input
                            type="date"
                            name="checkOut"
                            value={formData.checkOut}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Booking...' : 'Book Now'}
                    </button>
                </form>
            ) : (
                <p>Please log in to make a booking.</p>
            )}
            <Footer />
        </div>
    );
}

export default Booknow;
   