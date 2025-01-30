import mongoose, { Schema } from "mongoose";

const order = new Schema(
    {

        userId: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: [true, "User ID is required"],
        },
        orderId: {
            type: String,
            required: [true, "Provide orderId"],
            unique: true,
        },
        product_details: [{
            name: { type: String, required: true },
            image: { type: [String], default: [] },
        }],
        size: {
            type: String,
            default: ""
        },
        paymentId: {
            type: String,
            default: "",
        },
        payment_status: {
            type: String,
            default: "",
            enum: ["PENDING", "COMPLETE", "FAILED", "REFUNDED"], // Optional: Add constraints
        },
        delivery_address: {
            type: mongoose.Schema.Types.ObjectId,  // Reference to AddressModel
            ref: 'AddressModel',
            required: true
        },
        totalAmt: {
            type: Number,
            default: 0,
            min: 0,
        },



    }, { timestamps: true })


export const OrderModel = mongoose.model('OrderModel', order)