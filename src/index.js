// Import React (only once)
import React from 'react';
// Import createRoot from react-dom/client
import { createRoot } from 'react-dom/client'; 
import App from './App'; // Import your main App component

// Create root using createRoot
const root = createRoot(document.getElementById('root')); 

// Render the App component
root.render(<App />); 
