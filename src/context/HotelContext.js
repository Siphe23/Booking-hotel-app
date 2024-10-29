// src/context/HotelContext.js
import React, { createContext, useContext, useState } from 'react';

const HotelContext = createContext();

export const HotelProvider = ({ children }) => {
    const [ratings, setRatings] = useState({});
    const [favorites, setFavorites] = useState([]);

    const addFavorite = (roomId) => {
        setFavorites((prevFavorites) => [...prevFavorites, roomId]);
    };

    const rateRoom = (roomId, rating) => {
        setRatings((prevRatings) => ({ ...prevRatings, [roomId]: rating }));
    };

    return (
        <HotelContext.Provider value={{ ratings, favorites, addFavorite, rateRoom }}>
            {children}
        </HotelContext.Provider>
    );
};

export const useHotelContext = () => {
    return useContext(HotelContext);
};
