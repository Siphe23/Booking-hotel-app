// src/components/PaymentForm.js

import React from 'react';

const PaymentForm = ({ totalPrice, email, resetForm }) => {
    const handlePayment = (e) => {
        e.preventDefault();
        // Simulate payment processing
        alert(`Payment of $${totalPrice.toFixed(2)} for ${email} processed successfully!`);
        resetForm(); // Reset the form after payment
    };

    return (
        <div>
            <h3>Payment Details</h3>
            <p>Total Amount: ${totalPrice.toFixed(2)}</p>
            <form onSubmit={handlePayment}>
                {/* Here, you can integrate Stripe payment form components */}
                <button type="submit">Proceed to Payment</button>
            </form>
        </div>
    );
};

export default PaymentForm;
