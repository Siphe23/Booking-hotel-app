import React, { createContext, useState, useContext } from 'react';

// Create the RatingsContext
const RatingsContext = createContext();

export const useRatings = () => {
  return useContext(RatingsContext); // Custom hook to use the RatingsContext
};

// Provider component
export const RatingsProvider = ({ children }) => {
  const [userRatings, setUserRatings] = useState({});

  const updateRating = (offerId, rating) => {
    setUserRatings((prevRatings) => ({
      ...prevRatings,
      [offerId]: rating,
    }));
  };

  return (
    <RatingsContext.Provider value={{ userRatings, updateRating }}>
      {children}
    </RatingsContext.Provider>
  );
};
