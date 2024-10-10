 // src/components/PaymentForm.js

import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebase'; // Adjust the import based on your project structure

const PaymentForm = ({ totalPrice, email, resetForm }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        // Create a payment method
        const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (stripeError) {
            setError(stripeError.message);
            setLoading(false);
            return;
        }

        try {
            // Save payment info to Firestore or your backend
            await addDoc(collection(db, 'payments'), {
                email,
                paymentMethodId: paymentMethod.id,
                totalPrice,
                timestamp: new Date(),
            });

            alert('Payment successful!');
            resetForm(); // Reset the booking form after successful payment
        } catch (error) {
            console.error("Error processing payment: ", error);
            alert("Failed to process payment. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            {error && <p className="error">{error}</p>}
            <button type="submit" disabled={!stripe || loading}>
                {loading ? 'Processing...' : 'Pay Now'}
            </button>
        </form>
    );
};

export default PaymentForm;
