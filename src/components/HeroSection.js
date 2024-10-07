import React, { useState, useEffect } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import '../assets/hero.css';

const HeroSection = () => {
  const conversionRate = 18;
  const storage = getStorage();

  // State to store image URLs
  const [ceoImages, setCeoImages] = useState([]);
  const [offerImages, setOfferImages] = useState([]); // State for offer images
  const [currentCeoIndex, setCurrentCeoIndex] = useState(0);

  // State for search inputs
  const [searchLocation, setSearchLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredOffers, setFilteredOffers] = useState([]);

  const offers = [
    {
      id: 1,
      imgSrc: 'hotel/hotel2.jpg',
      title: 'Mossel Bay',
      priceUSD: 199,
      rating: 4,
      location: 'Mossel Bay',
    },
    {
      id: 2,
      imgSrc: 'hotel/hotel2.jpg',
      title: 'Ntsitsikama',
      priceUSD: 149,
      rating: 3,
      location: 'Ntsitsikama',
    },
    {
      id: 3,
      imgSrc: 'hotel/hotel2.jpg',
      title: 'Coffebay',
      priceUSD: 299,
      rating: 5,
      location: 'Coffebay',
    },
  ];

  const ceos = [
    { name: 'Jane Doe', occupation: 'CEO' },
    { name: 'John Smith', occupation: 'CTO' },
    { name: 'Emily Johnson', occupation: 'CFO' },
    { name: 'Michael Brown', occupation: 'Operations Manager' },
    { name: 'Linda Davis', occupation: 'Assistant Manager' },
    { name: 'William Wilson', occupation: 'General Manager' },
  ];

  // Fetch images on component mount
  useEffect(() => {
    const fetchImages = async () => {
      const offerUrls = [];
      const ceoUrls = [];

      // Fetch offer images
      for (const offer of offers) {
        try {
          const url = await getDownloadURL(ref(storage, offer.imgSrc));
          offerUrls.push(url);
        } catch (error) {
          console.error(`Error fetching image for ${offer.title}:`, error);
          offerUrls.push('path/to/placeholder/image.jpg');
        }
      }
      setOfferImages(offerUrls);

      // Fetch CEO images
      for (let i = 0; i < ceos.length; i++) {
        try {
          const url = await getDownloadURL(ref(storage, `ceo/${i + 1}.jpg`));
          ceoUrls.push(url);
        } catch (error) {
          console.error(`Error fetching image for ${ceos[i].name}:`, error);
          ceoUrls.push('path/to/placeholder/image.jpg');
        }
      }
      setCeoImages(ceoUrls);
    };

    fetchImages();
  }, [offers, ceos, storage]);

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

  const handleSearch = () => {
    const filtered = offers.filter((offer) =>
      offer.location.toLowerCase().includes(searchLocation.toLowerCase())
    );
    setFilteredOffers(filtered);
  };

  const currentCeo = ceos[currentCeoIndex];

  return (
    <section className="hero">
      <h1>Welcome to HotelHub – Your Gateway to Exceptional Stays</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Where to?"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)} // Update search location
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)} // Update start date
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)} // Update end date
        />
        <button onClick={handleSearch}>Search</button> {/* Trigger search */}
      </div>

      {/* Offer Cards */}
      <section className="offers">
        {(filteredOffers.length > 0 ? filteredOffers : offers).map((offer, index) => {
          const priceZAR = (offer.priceUSD * conversionRate).toFixed(2);
          return (
            <div key={offer.id} className="offer-card">
              <img src={offerImages[index]} alt={offer.title} className="offer-image" />
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

      {/* CEO Section */}
      <div className="ceo-card">
        {ceoImages.length > 0 ? (
          <>
            <img src={ceoImages[currentCeoIndex]} alt={currentCeo.name} className="ceo-photo" />
            <div className="ceo-details">
              <h4>{currentCeo.name}</h4>
              <p>{currentCeo.occupation}</p>
            </div>
          </>
        ) : (
          <p>Loading CEO images...</p>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
