import React, { useEffect, useState } from 'react';
import { useRatings } from '../context/RatingsContext'; // Import the context
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import '../assets/fav.css'; // Make sure to import your CSS for styling

const Favorites = () => {
  const { favourites } = useRatings(); // Access the favorites from context
  const [favoriteHotels, setFavoriteHotels] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3); // Show 3 hotels initially
  const storage = getStorage(); // Initialize Firebase Storage

  // Ensure favourites is defined and is an array
  const safeFavourites = Array.isArray(favourites) ? favourites : [];

  useEffect(() => {
    const fetchFavoriteHotels = async () => {
      const fetchedHotels = await Promise.all(
        safeFavourites.map(async (hotelId) => {
          try {
            const imgSrc = await getDownloadURL(ref(storage, `hotel/${hotelId}.jpg`)); // Assuming hotelId corresponds to the image name
            return { id: hotelId, imgSrc }; // Add more hotel details as needed
          } catch (error) {
            console.error(`Error fetching image for hotel ${hotelId}:`, error);
            return { id: hotelId, imgSrc: 'path/to/placeholder/image.jpg' }; // Placeholder image on error
          }
        })
      );

      setFavoriteHotels(fetchedHotels);
    };

    fetchFavoriteHotels();
  }, [safeFavourites, storage]);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 3); // Increase visible count by 3
  };

  const handleAddToFavorites = (hotelId) => {
    // Logic to add hotel to favorites
    console.log(`Added hotel ${hotelId} to favorites.`);
  };

  const handleShare = (hotelId) => {
    // Logic to share hotel information
    alert(`Sharing hotel ${hotelId}...`);
  };

  return (
    <div className="favorites">
      <h1>Your Favorite Hotels</h1>
      {favoriteHotels.length === 0 ? (
        <p>No favorite hotels added yet.</p>
      ) : (
        <ul>
          {favoriteHotels.slice(0, visibleCount).map((hotel) => (
            <li key={hotel.id} className="favorite-hotel">
              <img src={hotel.imgSrc} alt={`Hotel ${hotel.id}`} className="favorite-hotel-image" />
              <div className="hotel-info">
                <h2>Hotel {hotel.id}</h2>
                <button onClick={() => handleAddToFavorites(hotel.id)} className="add-button">Add</button>
                <button onClick={() => handleShare(hotel.id)} className="share-button">Share</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {visibleCount < favoriteHotels.length && (
        <button onClick={handleShowMore} className="show-more-button">Show More</button>
      )}
    </div>
  );
};

export default Favorites;
