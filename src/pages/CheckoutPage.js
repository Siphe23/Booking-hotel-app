import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../pages/checkoutForm';

const stripePromise = loadStripe('pk_test_51Q7YPz09Ta8MClJBUH2kbUiZN5oCcKm2J5qp3qZu7p5PN6hDt9CPrfZHwdI1swVFymlreTXSl3aLRfDTLNzSgTLu00z98j4NHf');

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

