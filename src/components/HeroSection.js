import React, { useState, useEffect, useMemo } from 'react'; 
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { FaMapMarkerAlt, FaShareAlt, FaHeart } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/hero.css';
import { useRatings } from '../context/RatingsContext'; 

const HeroSection = () => {
  const conversionRate = 18;
  const storage = getStorage();
  
  const { userRatings, updateRating } = useRatings();

  const [offerImages, setOfferImages] = useState([]);
  const [ceoImages, setCeoImages] = useState([]); // State to store CEO image URLs
  const [currentCeoIndex, setCurrentCeoIndex] = useState(0);
  const [favourites, setFavourites] = useState([]);
  const [showMore, setShowMore] = useState({}); 
  const [searchLocation, setSearchLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);

  const offers = useMemo(() => [
    {
      id: 1,   
      imgSrc: 'hotel/hotel2.jpg',
      title: 'Mossel Bay',
      priceUSD: 199,
      rating: 4,
      location: 'Mossel Bay',
      description: 'A stunning coastal town known for its beautiful beaches and rich history.',
      moreInfo: 'Located along the Garden Route, Mossel Bay offers various activities including whale watching and historical tours.',
    },
    {
      id: 2,
      imgSrc: 'hotel/hotel2.jpg',
      title: 'Ntsitsikama',
      priceUSD: 149,
      rating: 3,
      location: 'Ntsitsikama',
      description: 'A nature lover’s paradise with hiking trails and lush forests.',
      moreInfo: 'Famous for its national park, Ntsitsikama is perfect for adventure seekers and nature enthusiasts.',
    },
    {
      id: 3,
      imgSrc: 'hotel/hotel2.jpg',
      title: 'Coffebay',
      priceUSD: 299,
      rating: 5,
      location: 'Coffebay',
      description: 'A remote getaway with breathtaking views of the coastline and pristine beaches.',
      moreInfo: 'Known for its surf spots and stunning landscapes, Coffebay is a must-visit for beach lovers.',
    },
  ], []);

  const ceos = useMemo(() => [
    { name: 'Jane Doe', occupation: 'CEO', imgSrc: 'ceos/ceo1.jpg' },
    { name: 'John Smith', occupation: 'CTO', imgSrc: 'ceos/ceo2.jpg' },
    { name: 'Emily Johnson', occupation: 'CFO', imgSrc: 'ceos/ceo3.jpg' },
    { name: 'Michael Brown', occupation: 'Operations Manager', imgSrc: 'ceos/ceo4.jpg' },
    { name: 'Linda Davis', occupation: 'Assistant Manager', imgSrc: 'ceos/ceo5.jpg' },
  ], []);
  

  useEffect(() => {
    const fetchOfferImages = async () => {
      try {
        const offerUrls = await Promise.all(
          offers.map(async (offer) =>
            getDownloadURL(ref(storage, offer.imgSrc)).catch(() => {
              console.error(`Error fetching image for ${offer.title}`);
              return 'path/to/placeholder/image.jpg'; 
            })
          )
        );
        setOfferImages(offerUrls);
      } catch (error) {
        console.error('Error fetching offer images:', error);
      }
    };

    fetchOfferImages();
  }, [offers, storage]);

  useEffect(() => {
  
    const fetchCeoImages = async () => {
      try {
        const ceoUrls = await Promise.all(
          ceos.map(async (ceo) =>
            getDownloadURL(ref(storage, ceo.imgSrc)).catch(() => {
              console.error(`Error fetching image for ${ceo.name}`);
              return 'path/to/placeholder/image.jpg'; // Handle broken image case
            })
          )
        );
        setCeoImages(ceoUrls);
      } catch (error) {
        console.error('Error fetching CEO images:', error);
      }
    };
    
    fetchCeoImages();
  }, [ceos, storage]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCeoIndex((prevIndex) => (prevIndex + 1) % ceos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [ceos.length]);

  const handleShowMore = (id) => {
    setShowMore((prev) => {
      const newState = { ...prev, [id]: !prev[id] };
      if (newState[id]) {
        // Show toast when description is expanded
        toast.info(`Description: ${offers.find(offer => offer.id === id).description}`);
      }
      return newState;
    });
  };

  const handleSearch = () => {
    const filtered = offers.filter((offer) =>
      offer.location.toLowerCase().includes(searchLocation.toLowerCase())
    );
    setFilteredOffers(filtered);
  };

  const handleShare = (offer) => {
    const shareDetails = `Check out this accommodation: ${offer.title} - ${offer.description} - Price: R${(offer.priceUSD * conversionRate).toFixed(2)}/night`;
    navigator.clipboard.writeText(shareDetails).then(() => {
      toast.success('Accommodation details copied to clipboard!');
    });
  };

  const handleFavourites = (offer) => {
    setFavourites((prevFavourites) => {
      const isFavourite = prevFavourites.includes(offer.id);
      toast[isFavourite ? 'info' : 'success'](isFavourite ? 'Removed from favourites!' : 'Added to favourites!');
      return isFavourite ? prevFavourites.filter((id) => id !== offer.id) : [...prevFavourites, offer.id];
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
            onClick={() => updateRating(offerId, i + 1)}
          >
            &#9733;
          </span>
        ))}
      </div>
    );
  };

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
  
      <section className="offers">
        {(filteredOffers.length > 0 ? filteredOffers : offers).map((offer, index) => {
          const priceZAR = (offer.priceUSD * conversionRate).toFixed(2);
  
          return (
            <div key={offer.id} className="offer-card">
              <img src={offerImages[index]} alt={offer.title} className="offer-image" />
              <h3>{offer.title}</h3>
              <p>Starting from R{priceZAR}/night</p>
              <div className="offer-rating">{renderStars(offer.id, offer.rating)}</div>
              <p className="offer-location">
                <FaMapMarkerAlt /> {offer.location}
              </p>
              <p className="offer-description">{offer.description}</p>
              {showMore[offer.id] && <p className="more-info">{offer.moreInfo}</p>} {/* Show More info */}
              <button className="show-more-button" onClick={() => handleShowMore(offer.id)}>
                {showMore[offer.id] ? 'Show Less' : 'Show More'}
              </button>
              <div className="offer-actions">
                <button className="share-button" onClick={() => handleShare(offer)}>
                  <FaShareAlt /> Share
                </button>
                <button className="favorite-button" onClick={() => handleFavourites(offer)}>
                  <FaHeart color={favourites.includes(offer.id) ? 'red' : 'black'} />
                </button>
              </div>
            </div>
          );
        })}
      </section>

      <section className="ceo-section">
  <h2>Meet Our Team</h2>
  <div className="ceo-container">
    <img
      src={ceoImages[currentCeoIndex]}
      alt={ceos[currentCeoIndex].name}
      className="ceo-image"
    />
    <h3>{ceos[currentCeoIndex].name}</h3>
    <p>{ceos[currentCeoIndex].occupation}</p>
  </div>
</section>

      
      <ToastContainer position="top-center" />
    </section>
  );
};

export default HeroSection;
