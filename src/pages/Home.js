import React from 'react';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';
import Search from '../components/Search';
import HeroSection from '../components/HeroSection'; 
import OffersSection from '../components/OffersSection'; 

function Home() {
    return (
        <>
            <Navbar />
            <HeroSection /> {/* Add the Hero Section */}
            <Search /> {/* Your existing Search component */}
            <OffersSection /> {/* Add the Offers Section */}
            <Footer />
        </>
    );
}

export default Home;

