import React from 'react';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';
import HotelList from '../components/HotelList'; // Import the HotelList component

function OurHotels() {
    return (
        <>
            <Navbar />
            <HotelList /> {/* Include the HotelList here */}
            <Footer />
        </>
    );
}

export default OurHotels;
