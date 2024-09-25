
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../assets/Booknow.css';
import { db } from '../Firebase/firebase'; 
import { collection, addDoc } from 'firebase/firestore'; 

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

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Debugging
        console.log("Form Submitted");
    
        // Basic form validation
        if (!formData.email || !formData.firstName || !formData.lastName || !formData.checkIn || !formData.checkOut) {
            alert("Please fill in all required fields.");
            return;
        }
    
        if (new Date(formData.checkIn) >= new Date(formData.checkOut)) {
            alert("Check-out date must be after the check-in date.");
            return;
        }
    
        if (formData.persons <= 0 || formData.roomsType <= 0) {
            alert("Persons and Rooms Type must be greater than 0.");
            return;
        }
    
        try {
            // Log form data to ensure the data is correct
            console.log("Form Data: ", formData);
    
            // Add a new document to Firestore
            await addDoc(collection(db, "bookings"), {
                email: formData.email,
                firstName: formData.firstName,
                lastName: formData.lastName,
                persons: formData.persons,
                roomsType: formData.roomsType,
                checkIn: formData.checkIn,
                checkOut: formData.checkOut,
                timestamp: new Date(),
            });
    
          
            alert("Booking successful!");
    
            
            console.log("Booking submitted successfully!");
    
            
            setFormData({
                email: '',
                firstName: '',
                lastName: '',
                persons: 1,
                roomsType: 1,
                checkIn: '',
                checkOut: '',
            });
    
        } catch (error) {
           
            console.error("Error submitting booking: ", error);
            alert("Failed to submit the booking. Please try again.");
        }
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
