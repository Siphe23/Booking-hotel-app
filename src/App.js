<<<<<<< HEAD
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store'; 
import Home from './pages/Home';
import OurHotels from './pages/ourHotels';
import BookNow from './pages/booknow';
import AdminDashboard from './pages/AdminDashboard'; 
import AdminLogin from './pages/AdminLogin'; 
import UserProfile from './pages/Profile'; 
import PrivateRoute from './Private/PrivateRoute'; 
import Navbar from './components/Navbar'; 

function App() {
  const auth = useSelector((state) => state.auth); 

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Common Home Route for All Users */}
          <Route path="/home" element={<Home />} />

          {/* Admin Routes */}
          {auth.isAuthenticated && auth.userRole === 'admin' && (
            <>
              <Route path="/admin-home" element={<AdminLogin />} /> {/* Home for Admin showing the login form */}
              <Route 
                path="/admin-dashboard" 
                element={
                  <PrivateRoute role="admin">
                    <AdminDashboard />
                  </PrivateRoute>
                } 
              />
              <Route path="/admin-login" element={<AdminLogin />} /> {/* Admin Login Page */}
            </>
          )}

          {/* Regular User Routes */}
          {auth.isAuthenticated && auth.userRole === 'user' && (
            <>
              <Route path="/ourhotels" element={<OurHotels />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/booknow" element={<BookNow />} />
            </>
          )}

       
          {!auth.isAuthenticated && (
            <Route path="/admin-login" element={<AdminLogin />} />
          )}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
=======
>>>>>>> 8fbc38737a06c0b487cce1ac4896d4bc5b063d00
