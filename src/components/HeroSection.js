import React, { useState, useEffect, useMemo } from 'react'; 
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { FaMapMarkerAlt } from 'react-icons/fa'; 
import '../assets/hero.css';

const HeroSection = () => {
  const conversionRate = 18;
  const storage = getStorage();
  
  const [ceoImages, setCeoImages] = useState([]);
  const [offerImages, setOfferImages] = useState([]);
  const [currentCeoIndex, setCurrentCeoIndex] = useState(0);
  const [expandedOffer, setExpandedOffer] = useState(null); 

  const [searchLocation, setSearchLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredOffers, setFilteredOffers] = useState([]);

  const offers = useMemo(() => [
    { id: 1, imgSrc: 'hotel/hotel2.jpg', title: 'Mossel Bay', priceUSD: 199, rating: 4, location: 'Mossel Bay', description: 'A stunning coastal town known for its beautiful beaches and rich history.' },
    { id: 2, imgSrc: 'hotel/hotel2.jpg', title: 'Ntsitsikama', priceUSD: 149, rating: 3, location: 'Ntsitsikama', description: 'A nature lover’s paradise with hiking trails and lush forests.' },
    { id: 3, imgSrc: 'hotel/hotel2.jpg', title: 'Coffebay', priceUSD: 299, rating: 5, location: 'Coffebay', description: 'A remote getaway with breathtaking views of the coastline and pristine beaches.' },
  ], []);

  const ceos = useMemo(() => [
    { name: 'Jane Doe', occupation: 'CEO' },
    { name: 'John Smith', occupation: 'CTO' },
    { name: 'Emily Johnson', occupation: 'CFO' },
    { name: 'Michael Brown', occupation: 'Operations Manager' },
    { name: 'Linda Davis', occupation: 'Assistant Manager' }
  ], []);

  useEffect(() => {
    const fetchImages = async () => {
      const offerUrls = [];
      const ceoUrls = [];

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

      for (let i = 1; i <= ceos.length; i++) {
        try {
          const url = await getDownloadURL(ref(storage, `ceos/ceo${i}.jpg`));
          ceoUrls.push(url);
        } catch (error) {
          console.error(`Error fetching image for ${ceos[i - 1].name}:`, error);
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
      <span key={index} className={index < rating ? 'star filled' : 'star'}>★</span>
    ));
  };

  const handleSearch = () => {
    const filtered = offers.filter((offer) =>
      offer.location.toLowerCase().includes(searchLocation.toLowerCase())
    );
    setFilteredOffers(filtered);
  };

  const toggleShowMore = (offerId) => {
    if (expandedOffer === offerId) {
      setExpandedOffer(null);
    } else {
      setExpandedOffer(offerId); 
    }
  };

  const currentCeo = ceos[currentCeoIndex];

  return (
    <section className="hero">
      <h1>Welcome to HotelHub – Your Gateway to Exceptional Stays</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Where to?"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <section className="offers">
        {(filteredOffers.length > 0 ? filteredOffers : offers).map((offer, index) => {
          const priceZAR = (offer.priceUSD * conversionRate).toFixed(2);
          const isExpanded = expandedOffer === offer.id;

          return (
            <div key={offer.id} className={`offer-card ${isExpanded ? 'expanded' : ''}`}>
              <img src={offerImages[index]} alt={offer.title} className="offer-image" />
              <h3>{offer.title}</h3>
              <p>Starting from R{priceZAR}/night</p>
              <div className="offer-rating">{renderStars(offer.rating)}</div>
              <div className="offer-location">
                <FaMapMarkerAlt className="location-icon" /> 
                <span>{offer.location}</span>
              </div>
              
              {isExpanded && (
                <div className="more-info">
                  <p>{offer.description}</p>
                  <ul>
                    <li>Amenities: Free Wi-Fi, Breakfast included, Pool, Gym</li>
                    <li>Check-in time: 3:00 PM</li>
                    <li>Check-out time: 12:00 PM</li>
                  </ul>
                </div>
              )}

              <button onClick={() => toggleShowMore(offer.id)}>
                {isExpanded ? 'Show Less' : 'Show More'}
              </button>
            </div>
          );
        })}
      </section>

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
