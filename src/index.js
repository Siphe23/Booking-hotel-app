import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './redux/store'; // Make sure your store is correctly set up
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Wrap the App component in the Provider and pass the store
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
