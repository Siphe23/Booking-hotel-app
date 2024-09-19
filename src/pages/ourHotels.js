import React from 'react';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';
import HotelList from '../components/HotelList'; 
import '../assets/ourhotels.css';

function OurHotels() {
    return (
        <>
            <Navbar />
            <HotelList /> 
            <Footer />
        </>
    );
}

export default OurHotels;
