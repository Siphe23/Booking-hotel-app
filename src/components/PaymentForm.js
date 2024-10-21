import React, { useEffect, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../assets/PaymentForm.css';

const PaymentForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { amount, customerEmail, bookingDetails } = location.state || {}; // Retrieve amount and booking details
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchClientSecret = async () => {
      const response = await fetch('/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, customerEmail }),
      });

      const data = await response.json();
      setClientSecret(data.clientSecret); 
    };

    if (amount && customerEmail) {
      fetchClientSecret();
    }
  }, [amount, customerEmail]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return; 
    }

    const cardElement = elements.getElement(CardElement);
    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent.status === 'succeeded') {
      setMessage("Payment successful!");

      // Navigate to the receipt page with booking details
      navigate('/receipt', {
        state: {
          booking: bookingDetails, // Pass booking details to the receipt page
          amount: amount,
        },
      });
    }

    setIsLoading(false);
  };

  return (
    <>
      <Navbar />
      <h1 className="animated-heading">PAY NOW</h1>
      <form className="payment-form" onSubmit={handleSubmit}>
        <h2>Payment</h2>
        <div className="card-element">
          <CardElement />
        </div>
        <button type="submit" disabled={isLoading || !stripe || !clientSecret}>
          {isLoading ? <div className="spinner" /> : "Pay"}
        </button>
        {message && <div>{message}</div>}
      </form>
      <Footer />
    </>
  );
};

export default PaymentForm;

