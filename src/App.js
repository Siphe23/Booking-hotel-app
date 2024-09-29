import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store'; 
import Home from './pages/Home';
import Login from './pages/login'; 
import Register from './pages/register'; 
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/booknow" element={<Booknow />} />
        
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;