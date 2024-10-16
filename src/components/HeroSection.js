import React, { useState, useEffect, useMemo } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { FaMapMarkerAlt } from 'react-icons/fa';
import '../assets/hero.css';
import { useRatings } from '../context/RatingsContext'; // Import the context

const HeroSection = () => {
  const conversionRate = 18;
  const storage = getStorage();
  
  const { userRatings, updateRating } = useRatings(); // Get the context
  const [ceoImages, setCeoImages] = useState([]);
  const [offerImages, setOfferImages] = useState([]);
  const [currentCeoIndex, setCurrentCeoIndex] = useState(0);
  const [expandedOffer, setExpandedOffer] = useState(null);
  const [searchLocation, setSearchLocation] = useState('');
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [favourites, setFavourites] = useState([]); // State to hold favourite offers

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
      const offerUrls = await Promise.all(offers.map(async (offer) => {
        try {
          return await getDownloadURL(ref(storage, offer.imgSrc));
        } catch {
          console.error(`Error fetching image for ${offer.title}`);
          return 'path/to/placeholder/image.jpg'; // Use a placeholder for failed image fetch
        }
      }));
      setOfferImages(offerUrls);

      const ceoUrls = await Promise.all(ceos.map(async (_, i) => {
        try {
          return await getDownloadURL(ref(storage, `ceos/ceo${i + 1}.jpg`));
        } catch {
          console.error(`Error fetching image for ${ceos[i].name}`);
          return 'path/to/placeholder/image.jpg'; // Use a placeholder for failed image fetch
        }
      }));
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

  const handleSearch = () => {
    const filtered = offers.filter((offer) =>
      offer.location.toLowerCase().includes(searchLocation.toLowerCase())
    );
    setFilteredOffers(filtered);
  };

  const toggleShowMore = (offerId) => {
    setExpandedOffer((prev) => (prev === offerId ? null : offerId));
  };

  const handleRating = (offerId, rating) => {
    updateRating(offerId, rating);
  };

  const handleShare = (offer) => {
    // Implement your sharing functionality
    const shareDetails = `Check out this accommodation: ${offer.title} - ${offer.description} - Price: R${(offer.priceUSD * conversionRate).toFixed(2)}/night`;
    navigator.clipboard.writeText(shareDetails).then(() => {
      alert("Accommodation details copied to clipboard!");
    });
  };

  const handleFavourites = (offer) => {
    setFavourites((prevFavourites) => {
      if (prevFavourites.includes(offer.id)) {
        // Remove from favourites
        return prevFavourites.filter(id => id !== offer.id);
      }
      // Add to favourites
      return [...prevFavourites, offer.id];
    });
  };

  const renderStars = (offerId, rating) => {
    const totalStars = 5;
    return (
      <div className="stars">
        {[...Array(totalStars)].map((_, i) => (
          <span
            key={i}
            style={{ color: i < (userRatings[offerId] || rating) ? 'gold' : 'lightgray', cursor: 'pointer' }}
            onClick={() => handleRating(offerId, i + 1)}
          >
            &#9733;
          </span>
        ))}
      </div>
    );
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
        <button onClick={handleSearch}>Search</button>
      </div>

      <section className="offers">
        {(filteredOffers.length > 0 ? filteredOffers : offers).length > 0 ? (
          (filteredOffers.length > 0 ? filteredOffers : offers).map((offer, index) => {
            const priceZAR = (offer.priceUSD * conversionRate).toFixed(2);
            const isExpanded = expandedOffer === offer.id;

            return (
              <div key={offer.id} className={`offer-card ${isExpanded ? 'expanded' : ''}`}>
                <img src={offerImages[index]} alt={offer.title} className="offer-image" />
                <h3>{offer.title}</h3>
                <p>Starting from R{priceZAR}/night</p>
                <div className="offer-rating">{renderStars(offer.id, offer.rating)}</div>
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

                <button 
                  onClick={() => toggleShowMore(offer.id)} 
                  className="show-more-button"
                >
                  {isExpanded ? 'Show Less' : 'Show More'}
                </button>

                <button 
                  onClick={() => handleShare(offer)} 
                  className="share-button"
                >
                  Share
                </button>

                <button 
                  onClick={() => handleFavourites(offer)} 
                  className="favourites-button"
                >
                  {favourites.includes(offer.id) ? 'Remove from Favourites' : 'Add to Favourites'}
                </button>
              </div>
            );
          })
        ) : (
          <p>No offers found for your search.</p>
        )}
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
