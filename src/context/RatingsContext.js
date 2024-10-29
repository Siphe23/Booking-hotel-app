// src/context/RatingsContext.js
import React, { createContext, useContext, useState } from 'react';

const RatingsContext = createContext();

export const RatingsProvider = ({ children }) => {
    const [ratings, setRatings] = useState({});

    // Add any additional functions or state management you need

    return (
        <RatingsContext.Provider value={{ ratings, setRatings }}>
            {children}
        </RatingsContext.Provider>
    );
};

export const useRatingsContext = () => {
    return useContext(RatingsContext);
};
