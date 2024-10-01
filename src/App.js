import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store'; 
import Home from './pages/Home';
import Profile from './pages/Profile';
import OurHotels from './pages/ourHotels';
import Booknow from './pages/booknow';
import AdminLogin from './components/AdminLogin'; // Add AdminLogin import
import AdminProfile from './pages/AdminProfile'; // Add AdminProfile import

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
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
