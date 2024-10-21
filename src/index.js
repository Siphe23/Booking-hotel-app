import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Import the Provider
import store from './redux/store'; // Import your Redux store
import App from './App';
import { RatingsProvider } from './context/RatingsContext';

// Create root using createRoot
const root = createRoot(document.getElementById('root')); 

// Render the App component wrapped in Provider and RatingsProvider
root.render(
    <Provider store={store}> {/* Wrap App with Provider */}
        <RatingsProvider>
            <App />
        </RatingsProvider>
    </Provider>
);
