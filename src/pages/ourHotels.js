import React from 'react';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';
import HotelList from '../components/HotelList'; 
import '../assets/ourhotels.css';

function OurHotels() {
    return (
        <>
            <Navbar />
            <main>
                <HotelList />
            </main>
            <Footer />
        </>
    );
}

export default OurHotels;
