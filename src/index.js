import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; 
import store from './redux/store'; 
import App from './App';
import { HotelProvider } from './context/HotelContext'; // Import HotelProvider
import { RatingsProvider } from './context/RatingsContext'; // Import RatingsProvider

const root = createRoot(document.getElementById('root')); 

root.render(
    <Provider store={store}>
        <RatingsProvider>
            <HotelProvider>
                <App />
            </HotelProvider>
        </RatingsProvider>
    </Provider>
);

