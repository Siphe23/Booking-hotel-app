import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../assets/Booknow.css'; 
import Footer from '../components/Footer';

function Booknow() {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        persons: 1,
        roomsType: 'Single',
        checkIn: '',
        checkOut: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validation for check-out date being after check-in date
        if (new Date(formData.checkOut) <= new Date(formData.checkIn)) {
            alert('Check-out date must be after the check-in date.');
            return;
        }

        console.log(formData);
    };

    return (
        <div>
            <Navbar />

            <div className="booking-container">
                <h2>Bookings</h2>
                <form className="booking-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="email"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="firstName">Name</label>
                        <div className="name-fields">
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="First name"
                                required
                            />
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Last name"
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="persons">Persons</label>
                        <input
                            type="number"
                            id="persons"
                            name="persons"
                            value={formData.persons}
                            onChange={handleChange}
                            min="1"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="roomsType">Rooms Type</label>
                        <select
                            id="roomsType"
                            name="roomsType"
                            value={formData.roomsType}
                            onChange={handleChange}
                            required
                        >
                            <option value="Single">Single</option>
                            <option value="Double">Double</option>
                            <option value="Suite">Suite</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="checkIn">Check in</label>
                        <input
                            type="date"
                            id="checkIn"
                            name="checkIn"
                            value={formData.checkIn}
                            onChange={handleChange}
                            min={new Date().toISOString().split("T")[0]}  // Today's date as minimum
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="checkOut">Check out</label>
                        <input
                            type="date"
                            id="checkOut"
                            name="checkOut"
                            value={formData.checkOut}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="book-now-btn">Book now</button>
                </form>
            </div>

            <Footer />
        </div>
    );
}

export default Booknow;


