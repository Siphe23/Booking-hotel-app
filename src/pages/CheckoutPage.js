import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../pages/checkoutForm';

// Load Stripe outside of the component render to avoid re-creating the stripe object
const stripePromise = loadStripe('your-publishable-key');

function CheckoutPage({ bookingAmount, customerEmail }) {
  return (
    <div>
      <h2>Complete Your Payment</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm bookingAmount={bookingAmount} customerEmail={customerEmail} />
      </Elements>
    </div>
  );
}

export default CheckoutPage;
