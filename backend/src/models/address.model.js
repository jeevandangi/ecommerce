import mongoose, { Schema } from "mongoose"


const address = new Schema({
    country: {
        type: String,
        required: true,
        lowercase: true
    },
    district: {
        type: String,
        required: true,
        lowercase: true
    },
    provience: {
        type: String,
        required: true,
        lowercase: true
    },
    city: {
        type: String,
        required: true,
        lowercase: true
    },
    tole: {
        type: String,
        required: true,
        lowercase: true
    },
    muncipility: {
        type: String,
        required: true,
        lowercase: true
    },
    number: {
        type: String,
        required: true,
        default: ''
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })


export const AddressModel = mongoose.model('AddressModel', address)