import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import OurHotels from './pages/ourHotels';
import Booknow from './pages/booknow'; 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/ourhotels" element={<OurHotels />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/booknow" element={<Booknow />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
