
import React from 'react';
import '../assets/hero.css'; 


const offers = [
  {
    id: 1,
    imgSrc: '/images/hotel1.jpg', 
    title: 'Hotel in New York',
    price: 'Starting from $199/night'
  },
  {
    id: 2,
    imgSrc: '/images/hotel2.jpg', 
    title: 'Hotel in Paris',
    price: 'Starting from $149/night'
  },
  {
    id: 3,
    imgSrc: '/images/hotel3.jpg', 
    title: 'Hotel in Tokyo',
    price: 'Starting from $299/night'
  }
];

const OffersSection = () => {
  return (
    <section className="offers">
      {offers.map(offer => (
        <div key={offer.id} className="offer-card">
          <img src={offer.imgSrc} alt={offer.title} className="offer-image" />
          <h3>{offer.title}</h3>
          <p>{offer.price}</p>
        </div>
      ))}
    </section>
  );
};

export default OffersSection;
