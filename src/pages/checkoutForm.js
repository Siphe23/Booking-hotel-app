import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../assets/checkoutForm.css'; // Correct import for the CSS file

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#333',  // Text color for card input
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      '::placeholder': {
        color: '#888',  // Placeholder color
      },
    },
    invalid: {
      color: '#e5424d',  // Error color
    },
  },
};

function CheckoutForm({ bookingAmount, customerEmail }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const response = await fetch('http://localhost:4000/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: bookingAmount * 100,  // Amount in cents
        customerEmail,
      }),
    });

    const data = await response.json();

    if (data.error) {
      setErrorMessage(data.error);
      setLoading(false);
      return;
    }

    const clientSecret = data.clientSecret;
    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          email: customerEmail,
        },
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else if (paymentIntent.status === 'succeeded') {
      setPaymentSuccess(true);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <CardElement options={CARD_ELEMENT_OPTIONS} className="card-element" />
      <button type="submit" disabled={!stripe || loading} className="submit-button">
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {paymentSuccess && <p className="success-message">Payment successful!</p>}
    </form>
  );
}

export default CheckoutForm;
