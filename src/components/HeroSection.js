import React, { useState, useEffect } from 'react';
import '../assets/hero.css';
import STAFFS1 from '../ceos/aca.png'; 
import STAFFS2 from '../ceos/27.jpg'; 
import STAFFS3 from '../ceos/Rosalind-Brewer_Headshot_Cropped.jpg'; 
import STAFFS4 from '../ceos/pexels-divinetechygirl-1181695.jpg';
import STAFFS5 from '../ceos/pexels-moose-photos-170195-1036623.jpg';
import STAFFS6 from '../ceos/pexels-ono-kosuki-5647284.jpg';

const HeroSection = () => {
  const conversionRate = 18;

  const offers = [
    {
      id: 1,
      imgSrc: '../images/mossel-bay.jpg',
      title: 'Mossel Bay',
      priceUSD: 199,
      rating: 4,
      location: 'Mossel Bay'
    },
    {
      id: 2,
      imgSrc: '../images/hotel.png',
      title: 'Ntsitsikama',
      priceUSD: 149,
      rating: 3,
      location: 'Ntsitsikama'
    },
    {
      id: 3,
      imgSrc: '../images/hotel3.jpg',
      title: 'Coffebay',
      priceUSD: 299,
      rating: 5,
      location: 'Coffebay'
    }
  ];


  const ceos = [
    {
      name: 'Jane Doe',
      occupation: 'CEO',
      imgSrc: STAFFS1,
    },
    {
      name: 'John Smith',
      occupation: 'CTO',
      imgSrc: STAFFS2,
    },
    {
      name: 'Emily Johnson',
      occupation: 'CFO',
      imgSrc: STAFFS3,
    },
    {
      name: 'Michael Brown',
      occupation: 'Operations Manager',
      imgSrc: STAFFS4,
    },
    {
      name: 'Linda Davis',
      occupation: 'Assistant Manager',
      imgSrc: STAFFS5,
    },
    {
      name: 'William Wilson',
      occupation: 'General Manager',
      imgSrc: STAFFS6,
    }
  ];
  

  const [currentCeoIndex, setCurrentCeoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCeoIndex((prevIndex) => (prevIndex + 1) % ceos.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, [ceos.length]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? 'star filled' : 'star'}>
        ★
      </span>
    ));
  };

  const currentCeo = ceos[currentCeoIndex];

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

      <div className="ceo-card">
        <img src={currentCeo.imgSrc} alt={currentCeo.name} className="ceo-photo" />
        <div className="ceo-details">
          <h4>{currentCeo.name}</h4>
          <p>{currentCeo.occupation}</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

