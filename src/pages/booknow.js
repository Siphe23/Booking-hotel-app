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
        roomsType: 1,
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
                        <input
                            type="number"
                            id="roomsType"
                            name="roomsType"
                            value={formData.roomsType}
                            onChange={handleChange}
                            min="1"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="checkIn">Check in</label>
                        <input
                            type="date"
                            id="checkIn"
                            name="checkIn"
                            value={formData.checkIn}
                            onChange={handleChange}
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
