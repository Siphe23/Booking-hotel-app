import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Home from './pages/Home';
import OurHotels from './pages/ourHotels';
import BookNow from './pages/booknow';
import Profile from './pages/Profile';
import PaymentForm from './components/PaymentForm';


const stripePromise = loadStripe('pk_test_51Q7YPz09Ta8MClJBUH2kbUiZN5oCcKm2J5qp3qZu7p5PN6hDt9CPrfZHwdI1swVFymlreTXSl3aLRfDTLNzSgTLu00z98j4NHf');

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/ourhotels" element={<OurHotels />} />
          <Route path="/booknow" element={<BookNow />} />
          <Route path="/profile" element={<Profile />} />
         
          <Route
            path="/paymentform"
            element={
              <Elements stripe={stripePromise}>
                <PaymentForm />
              </Elements>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
