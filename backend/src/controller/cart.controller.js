import { CartModel } from "../models/cart.model.js"
import { ProductModel } from "../models/product.model.js"
import { User } from "../models/user.Model.js"
import { apiError } from "../utils/apiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"
import { apiResponse } from "../utils/apiResponse.js"

const cartController = asyncHandler(async (req, res) => {
    try {
        const { _id, userId, token } = req.body
        console.log(_id);

        if (!token) {
            throw new apiError(400, "Please login to add product to cart")
        }
        const result = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)


        if (!result) {
            throw new apiError(400, "Invalid token")
        }

        const user = await User.findById(userId)
        if (!user) {
            throw new apiError(400, "User not found")
        }


        const product = await ProductModel.findById(_id)

        // console.log(product);
        if (!product) {
            throw new apiError(400, "Product not found")
        }

        const cart = await CartModel.create({
            productId: product._id,
            userId: user._id,
        })
        if (!cart) {
            throw new apiError(400, "Error saving product data");
        }

        const addingUserModel = await User.findByIdAndUpdate(userId,
            {
                $push: { shoppingCart: cart._id }
            }
        )
        res.status(201).json(new apiResponse(201, 'Product saved successfully',));

    } catch (error) {
        if (error instanceof apiError) {
            return res.status(400).send({ message: error.message, success: false, statusCode: error.statusCode })
        }
    }
})




const getCart = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params


        const user = await User.findById(id).populate('shoppingCart')
        if (!user) {
            throw new apiError(400, "User not found")
        }
        const cartId = user.shoppingCart


        const products = await ProductModel.find({
            _id: { $in: cartId.map(item => item.productId) }
        });




        if (!products) {
            throw new apiError(400, "Cart is empty")
        }

        res.status(200).json(new apiResponse(200, 'Cart fetched successfully', products));
    } catch (error) {
        if (error instanceof apiError) {
            return res.status(400).send({ message: error.message, success: false, statusCode: error.statusCode })
        }
    }
})
const removeCart = asyncHandler(async (req, res) => {
    try {
        const { productId, userId, token } = req.body
        if (!token) {
            throw new apiError(400, "Please login to remove product from cart")
        }
        const verifyToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        if (!verifyToken) {
            throw new apiError(400, "Invalid token")
        }
        const user = await User.findById(userId)
        if (!user) {
            throw new apiError(400, "User not found")
        }
        const removeCart = await CartModel.findOneAndDelete({ productId })
        if (!removeCart) {
            throw new apiError(400, "Product not found in cart")
        }


        const removeUserModel = await User.findByIdAndUpdate(
            userId,
            { $pull: { shoppingCart: removeCart._id } },
            { new: true }
        )
        res.status(200).json(new apiResponse(200, 'Product removed successfully'));



    } catch (error) {
        if (error instanceof apiError) {
            return res.status(400).send({ message: error.message, success: false, statusCode: error.statusCode })

        }
    }
})

export {
    cartController,
    removeCart,
    getCart
}       