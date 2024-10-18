// Import React
// Import React
import React from 'react';
// Import createRoot from react-dom/client
import { createRoot } from 'react-dom/client'; 
import { Provider } from 'react-redux'; // Import Provider
import store from './redux/store'; // Adjust this path to your store file
import App from './App'; // Import your main App component
import { RatingsProvider } from './context/RatingsContext'; // Import the RatingsProvider

// Create root using createRoot
const root = createRoot(document.getElementById('root')); 

// Render the App component wrapped in RatingsProvider and Redux Provider
root.render(
    <Provider store={store}>
        <RatingsProvider>
            <App />
        </RatingsProvider>
    </Provider>
);
