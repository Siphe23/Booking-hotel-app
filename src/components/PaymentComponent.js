import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPaymentInfo, clearPaymentInfo } from '../redux/paymentSlice';

const PaymentComponent = () => {
    const dispatch = useDispatch();
    const paymentInfo = useSelector((state) => state.payment.paymentInfo);

    const handlePayment = (paymentDetails) => {
     
        dispatch(setPaymentInfo(paymentDetails)); 
    };

    const handleClear = () => {
        dispatch(clearPaymentInfo()); 
    };

    return (
        <div>
            <h2>Payment Information</h2>
            {paymentInfo ? (
                <div>
                    <p>Payment ID: {paymentInfo.id}</p>
                    <p>Amount: {paymentInfo.amount}</p>
                </div>
            ) : (
                <p>No payment information available.</p>
            )}
            <button onClick={handleClear}>Clear Payment Info</button>
        </div>
    );
};

export default PaymentComponent;
