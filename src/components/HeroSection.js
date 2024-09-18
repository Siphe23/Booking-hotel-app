import React from 'react';
import '../assets/hero.css';
import STAFFS from '../ceos/aca.png'; // Ensure the image path is correct

const HeroSection = () => {
  const conversionRate = 18;

  const offers = [
    {
      id: 1,
      imgSrc: './images/download.png',
      title: 'Mossel Bay',
      priceUSD: 199,
      rating: 4,
      location: 'Mossel Bay'
    },
    {
      id: 2,
      imgSrc: '/images/hotel2.jpg',
      title: 'Ntsitsikama',
      priceUSD: 149,
      rating: 3,
      location: 'Ntsitsikama'
    },
    {
      id: 3,
      imgSrc: '/images/hotel3.jpg',
      title: 'Coffebay',
      priceUSD: 299,
      rating: 5,
      location: 'Coffebay'
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? 'star filled' : 'star'}>
        ★
      </span>
    ));
  };

  return (
    <section className="hero">
      <h1>Welcome to HotelHub – Your Gateway to Exceptional Stays</h1>
      <div className="search-bar">
        <input type="text" placeholder="Where to?" />
        <input type="date" />
        <input type="date" />
        <button>Search</button>
      </div>

      <section className="offers">
        {offers.map((offer) => {
          const priceZAR = (offer.priceUSD * conversionRate).toFixed(2);
          return (
            <div key={offer.id} className="offer-card">
              <img src={offer.imgSrc} alt={offer.title} className="offer-image" />
              <h3>{offer.title}</h3>
              <p>Starting from R{priceZAR}/night</p>
              <div className="offer-rating">{renderStars(offer.rating)}</div>
              <div className="offer-location">
                <img src="./images/location-icon.png" alt="Location Icon" className="location-icon" />
                <span>{offer.location}</span>
              </div>
              <button className="show-more-button">Show More</button>
            </div>
          );
        })}
      </section>

      {/* CEO Card */}
      <div className="ceo-card">
        <img src={STAFFS} alt="CEO" className="ceo-photo" />
        <div className="ceo-details">
          <h4>Lorem Ipsum, CEO of the company</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus facilisis leo quam.</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
