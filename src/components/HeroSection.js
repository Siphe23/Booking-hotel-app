import React, { useState, useEffect, useMemo } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { FaMapMarkerAlt, FaShareAlt, FaHeart, FaFacebook, FaTwitter, FaWhatsapp, FaTimes } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/hero.css';


const HeroSection = () => {
  const conversionRate = 18; 
  const storage = getStorage();


  const [offerImages, setOfferImages] = useState([]);
  const [ceoImages, setCeoImages] = useState([]);
  const [currentCeoIndex, setCurrentCeoIndex] = useState(0);
  // const [favourites, setFavourites] = useState([]);
  const [showMore, setShowMore] = useState({});
  const [adults, setAdults] = useState(0); 
const [kids, setKids] = useState(0); 

  // const [searchLocation, setSearchLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [currentOffer, setCurrentOffer] = useState(null);

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
      link: 'https://example.com/mosselbay'
    },
    {
      id: 2,
      imgSrc: 'hotel/hotel2.jpg',
      title: 'Mossel Bay',
      priceUSD: 149,
      rating: 3,
      location: 'Mossel Bay',
      description: 'A nature lover’s paradise with hiking trails and lush forests.',
      moreInfo: 'Famous for its national park, Ntsitsikama is perfect for adventure seekers and nature enthusiasts.',
      link: 'https://example.com/ntsitsikama'
    },
    {
      id: 3,
      imgSrc: 'hotel/hotel2.jpg',
      title: 'Mossel Bay',
      priceUSD: 299,
      rating: 5,
      location: 'Mossel Bay',
      description: 'A remote getaway with breathtaking views of the coastline and pristine beaches.',
      moreInfo: 'Known for its surf spots and stunning landscapes, Coffebay is a must-visit for beach lovers.',
      link: 'https://example.com/coffebay'
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
              return 'path/to/placeholder/image.jpg';
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
        toast.info(`Description: ${offers.find(offer => offer.id === id).description}`);
      }
      return newState;
    });
  };
  const handleSearch = () => {
    console.log("Adults:", adults, "Kids:", kids);
    
    const filtered = offers.filter((offer) => {
      const isWithinDateRange =
        new Date(offer.startDate) <= new Date(startDate) &&
        new Date(offer.endDate) >= new Date(endDate);
  
      const meetsPersonCriteria =
        offer.adults >= adults && offer.kids >= kids;
  
      return isWithinDateRange && meetsPersonCriteria;
    });
  
    setFilteredOffers(filtered);
  };
  

  // const handleFavourites = (offer) => {
  //   setFavourites((prevFavourites) => {
  //     const isFavourite = prevFavourites.includes(offer.id);
  //     toast[isFavourite ? 'info' : 'success'](isFavourite ? 'Removed from favourites!' : 'Added to favourites!');
  //     return isFavourite ? prevFavourites.filter((id) => id !== offer.id) : [...prevFavourites, offer.id];
  //   });
  // };

  const handleShareButtonClick = (offer) => {
    setCurrentOffer(currentOffer?.id === offer.id ? null : offer);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentOffer.link);
    toast.success('Link copied to clipboard!');
  };

  const closeShareModal = () => {
    setCurrentOffer(null);
  };

  return (
    <section className="hero">
      <h1>Welcome to HotelHub – Your Gateway to Exceptional Stays</h1>

      <div className="search-container">
  <div className="search-bar">
    <label>
      Check-in Date:
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
    </label>
    
    <label>
      Check-out Date:
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
    </label>
    
    <label>
      Adults:
      <input
        type="number"
        min="1"
        value={adults}
        onChange={(e) => setAdults(e.target.value)}
      />
    </label>

    <label>
      Kids:
      <input
        type="number"
        min="0"
        value={kids}
        onChange={(e) => setKids(e.target.value)}
      />
    </label>

    <button onClick={handleSearch}>Search</button>
  </div>
</div>


      <div className="offers">
        {(filteredOffers.length ? filteredOffers : offers).map((offer) => (
          <div key={offer.id} className="offer-card">
            <img src={offerImages[offer.id - 1]} alt={offer.title} className="offer-image" />
            <h2>{offer.title}</h2>
            <p>Price: R{(offer.priceUSD * conversionRate).toFixed(2)}</p>
            <p className="offer-location"><FaMapMarkerAlt /> {offer.location}</p>
            <p>{showMore[offer.id] ? offer.moreInfo : `${offer.description.slice(0, 100)}...`}</p>
            <div className="offer-actions">
              <button className="show-more-button" onClick={() => handleShowMore(offer.id)}>
                {showMore[offer.id] ? 'Show Less' : 'Show More'}
              </button>
              {/* <button onClick={() => handleFavourites(offer)}>
                <FaHeart color={favourites.includes(offer.id) ? 'red' : 'grey'} />
              </button> */}
              <button className="share-button" onClick={() => handleShareButtonClick(offer)}>
                <FaShareAlt />
              </button>
            </div>

            {currentOffer?.id === offer.id && (
              <div className="share-modal">
                <button className="close-button" onClick={closeShareModal}><FaTimes /></button>
                <h4>Share this offer:</h4>
                <div className="social-buttons">
                  <FacebookShareButton url={offer.link} className="share-button facebook-button">
                    <FaFacebook /> Share on Facebook
                  </FacebookShareButton>
                  <TwitterShareButton url={offer.link} className="share-button twitter-button">
                    <FaTwitter /> Share on Twitter
                  </TwitterShareButton>
                  <WhatsappShareButton url={offer.link} className="share-button whatsapp-button">
                    <FaWhatsapp /> Share on WhatsApp
                  </WhatsappShareButton>
                  <button onClick={handleCopyLink} className="share-button copy-button">Copy Link</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CEO Section */}
      <div className="ceo-section">
        <h2>Meet Our Team</h2>
        <div className="ceo-card">
          <img src={ceoImages[currentCeoIndex]} alt={ceos[currentCeoIndex].name} className="ceo-image" />
          <h3>{ceos[currentCeoIndex].name}</h3>
          <p>{ceos[currentCeoIndex].occupation}</p>
        </div>
      </div>

      <ToastContainer />
    </section>
  );
};

export default HeroSection;
