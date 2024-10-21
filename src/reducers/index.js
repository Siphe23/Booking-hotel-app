// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store'; // Adjust the path according to your folder structure
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
