import React from 'react';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';
import Search from '../components/Search';

function Home() {
    return (
        <>
            <Navbar />
            <h1>Home page</h1>
            <Search />
            <Footer />
        </>
    );
}

export default Home;
