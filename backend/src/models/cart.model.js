import mongoose, { Schema } from "mongoose"


const cart = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductModel'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })


export const CartModel = mongoose.model('CartModel', cart)