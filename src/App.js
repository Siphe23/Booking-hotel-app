import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store'; 
import Home from './pages/Home';
import OurHotels from './pages/ourHotels'; // Ensure the casing matches the file
import Booknow from './pages/booknow'; // Ensure the casing matches the file
import Profile from './pages/Profile'; // Import the Profile component

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/ourhotels" element={<OurHotels />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/booknow" element={<Booknow />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

