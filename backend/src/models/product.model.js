import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
    {

        productName: {
            type: String,
            required: true,
            index: true,
            lowercase: true
        },
        brand: {
            type: String,
            required: true,
            lowercase: true
        },
        price: {
            type: Number,
            required: true,

        },
        categoryid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CategoryModel'
        },
        quantity: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        discount: {
            type: Number,
        },
        description: {
            type: String,
            required: true
        }

    }, { timestamps: true })


export const ProductModel = mongoose.model('ProductModel', productSchema)