// frontend/src/components/PaymentForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { apiResponseHandler } from '../apiResponse/apiResponse';


const CheckOut = () => {
    const [amount, setAmount] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [productName, setProductName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8000/api/v1/esewa/generate-signature", {
                amount,
                transactionId,
                productName,
            });
            console.log(response.data.message.url);

            // Redirect to eSewa payment page
            window.location.href = response.data.message.url;
        } catch (error) {
            console.error('Error initiating payment:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Transaction ID"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
            />
            <button type="submit">Pay with eSewa</button>
        </form>
    );
};

export { CheckOut }