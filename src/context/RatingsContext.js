import React, { createContext, useContext, useState } from 'react';

const RatingsContext = createContext();

export const RatingsProvider = ({ children }) => {
  const [userRatings, setUserRatings] = useState({});
  const [favourites, setFavourites] = useState([]);

  const updateRating = (offerId, newRating) => {
    setUserRatings((prevRatings) => ({
      ...prevRatings,
      [offerId]: newRating,
    }));
  };

  const toggleFavourite = (offerId) => {
    setFavourites((prevFavourites) => {
      if (prevFavourites.includes(offerId)) {
        return prevFavourites.filter((id) => id !== offerId);
      }
      return [...prevFavourites, offerId];
    });
  };

  return (
    <RatingsContext.Provider value={{ userRatings, updateRating, favourites, toggleFavourite }}>
      {children}
    </RatingsContext.Provider>
  );
};

export const useRatings = () => {
  return useContext(RatingsContext);
};

export default RatingsContext;
