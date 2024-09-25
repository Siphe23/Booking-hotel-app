import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store'; 
import Home from './pages/Home';
import ProfilePage from './pages/Profile'; // Adjusted import for ProfilePage
import OurHotels from './pages/ourHotels';
import Booknow from './pages/booknow';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/ourhotels" element={<OurHotels />} />
          <Route path="/profile" element={<ProfilePage />} /> {/* Updated to ProfilePage */}
          <Route path="/booknow" element={<Booknow />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
