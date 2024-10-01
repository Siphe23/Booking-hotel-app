import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import OurHotels from './pages/ourHotels';
import Booknow from './pages/booknow';
import AdminProfile from './pages/Admin'; // Ensure the correct path
import AdminLogin from './components/AdminLogin'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/ourhotels" element={<OurHotels />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/booknow" element={<Booknow />} />
        <Route path="/admin" element={<AdminProfile />} />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

