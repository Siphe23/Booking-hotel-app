import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Home from './pages/Home';
import OurHotels from './pages/ourHotels';
import BookNow from './pages/booknow';
import Profile from './pages/Profile';
import PersonalForm from './components/PersonalForm';
import PaymentForm from './components/PaymentForm';
import Favorites from './pages/Favorites';
import { RatingsProvider } from './context/RatingsContext';
import { HotelProvider } from './context/HotelContext'; // Import your HotelProvider
import UserProfile from './components/UserProfile';
import ReviewPage from './pages/ReviewPage'; // Importing the ReviewPage
import BookingDetails from './components/BookingDetails';

const stripePromise = loadStripe('pk_test_51Q7YPz09Ta8MClJBUH2kbUiZN5oCcKm2J5qp3qZu7p5PN6hDt9CPrfZHwdI1swVFymlreTXSl3aLRfDTLNzSgTLu00z98j4NHf');

const App = () => {
    const [ratings, setRatings] = useState([]); // Initialize as an array
    const [favorites, setFavorites] = useState([]);

    return (
        <RatingsProvider>
            <HotelProvider>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/ourhotels" element={<OurHotels />} />
                        <Route path="/booknow" element={<BookNow />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/personal" element={<PersonalForm />} />
                        <Route path="/paymentform" element={
                            <Elements stripe={stripePromise}>
                                <PaymentForm />
                            </Elements>
                        } />
                        <Route path="/userprofile" element={<UserProfile />} />
                        <Route path="/favorites" element={<Favorites />} />
                        <Route path="/bookingDetails" element={<BookingDetails />} />
                        <Route
                            path="/reviewpage"
                            element={<ReviewPage ratings={ratings} favorites={favorites} />} // Pass props correctly
                        />
                    </Routes>
                </BrowserRouter>
            </HotelProvider>
        </RatingsProvider>
    );
};

export default App;
