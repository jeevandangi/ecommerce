import mongoose, { mongo, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            index: true,
            lowercase: true
        },
        phone: {
            type: String,
            required: true,
            index: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        role: {
            type: String,
            required: true,
            default: 'user'
        },
        avatar: {
            type: String,
            default: ''
        },
        addressDetails: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AddressModel'
        }],
        shoppingCart: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CartModel'
        }],
        orderhistory: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'OrderModel'
        }],
        refreshToken: {
            type: String
        }

    })

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            role: this.role,
            userName: this.userName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
        }
    )
}
userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
        }
    )
}

export const User = mongoose.model("User", userSchema);