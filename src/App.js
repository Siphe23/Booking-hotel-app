import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store'; 
import Home from './pages/Home';
import OurHotels from './pages/ourHotels';
import BookNow from './pages/booknow';
import AdminDashboard from './pages/AdminDashboard'; 
import AdminLogin from './pages/AdminLogin'; 
import PrivateRoute from './Private/PrivateRoute'; 

function App() {
  const auth = useSelector((state) => state.auth); 

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/ourhotels" element={<OurHotels />} />
          <Route path="/booknow" element={<BookNow />} />

          {/* Admin Dashboard Route */}
          {auth.isAuthenticated && auth.userRole === 'admin' && (
            <Route 
              path="/admin-dashboard" 
              element={
                <PrivateRoute role="admin">
                  <AdminDashboard />
                </PrivateRoute>
              } 
            />
          )}

          {/* Admin Login Route */}
          {!auth.isAuthenticated && (
            <Route path="/admin-login" element={<AdminLogin />} />
          )}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
