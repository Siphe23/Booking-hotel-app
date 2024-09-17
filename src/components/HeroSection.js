import React from 'react';
import '../assets/hero.css'; 

const HeroSection = () => {
  return (
    <section className="hero">
      <h1>Welcome to HotelHub – Your Gateway to Exceptional Stays</h1>
      <div className="search-bar">
        <input type="text" placeholder="Where to?" />
        <input type="date" />
        <input type="date" />
        <button>Search</button>
      </div>
    </section>
  );
};

export default HeroSection;
