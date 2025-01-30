import axios from 'axios';
import { asyncHandler } from '../utils/asyncHandler.js';
import { apiResponse } from '../utils/apiResponse.js';
import crypto from 'crypto';
import { apiError } from '../utils/apiError.js';
import dotenv from 'dotenv';



const ESEWA_MERCHANT_ID = process.env.ESEWA_MERCHANT_ID;
const ESEWA_SECRET_KEY = process.env.ESEWA_SECRET_KEY;
const ESEWA_URL = process.env.ESEWA_URL || 'https://rc-epay.esewa.com.np/api/epay/main/v2/form';

const initiateEsewaPayment = asyncHandler(async (req, res) => {
    try {
        const { amount, transactionId, productName } = req.body;

        // Validate inputs
        if (!amount || isNaN(amount) || amount <= 0) {
            throw new apiError(400, "Invalid or missing amount");
        }
        if (!transactionId || !productName) {
            throw new apiError(400, "Transaction ID and product name are required");
        }

        const successUrl = process.env.SUCCESS_URL || 'http://localhost:3000/success';
        const failureUrl = process.env.FAILURE_URL || 'http://localhost:3000/failure';

        const payload = {
            amount: amount,
            tax_amount: 0,
            total_amount: amount,
            transaction_uuid: transactionId,
            product_code: productName,
            success_url: successUrl,
            failure_url: failureUrl,
            signed_field_names: 'total_amount,transaction_uuid,product_code',
            signature: '', // Will be generated below
        };

        // Generate signature
        const signatureData = `total_amount=${payload.total_amount},transaction_uuid=${payload.transaction_uuid},product_code=${payload.product_code}`;
        payload.signature = crypto
            .createHmac('sha256', ESEWA_SECRET_KEY)
            .update(signatureData)
            .digest('base64');

        // Respond with the payment URL
        return res.status(200).json(
            new apiResponse(
                200,
                { url: `${ESEWA_URL}?${new URLSearchParams(payload).toString()}` },
                "Payment initiated successfully"
            )
        );
    } catch (error) {
        console.error('eSewa Payment Error:', error); // Log detailed error for debugging
        throw new apiError(500, error.message || "Failed to initiate payment");
    }
});

export { initiateEsewaPayment };
