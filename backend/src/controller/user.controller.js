import { User } from '../models/user.Model.js';
import { apiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { apiResponse } from '../utils/apiResponse.js';
import { createUserLoginValidation, createUserValidation } from '../middleware/errorHandler.middleware.js';
import { ProductModel } from '../models/product.model.js';
// import { ValidationError } from "joi";

const generateAccessAndRefToken = async (id) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new apiError(404, 'User not found');
        }
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new apiError(500, 'Token generation failed');
    }

}



const registerUser = asyncHandler(async (req, res) => {

    try {


        await createUserValidation.validateAsync(req.body);
        const { name, phoneNumber, password } = req.body
        // console.log(validationResult);

        if (
            [name, phoneNumber, password].some((field) => field?.trim() === '')
        ) {
            throw new apiError(400, 'All fields are required');
        }


        const userExist = await User.findOne({ phone: phoneNumber });
        console.log(userExist);

        if (userExist) {
            throw new apiError(400, 'User already exists');
        }

        const user = await User.create({
            userName: name.toLowerCase(),
            phone: phoneNumber,
            password
        })

        const createdUser = await User.findById(user._id).select('-password -refreshToken');
        if (!createdUser) {
            throw new apiError(500, 'User not created');
        }
        res.status(201).json(new apiResponse(201, 'User created successfully', createdUser));

    } catch (error) {
        if (error.isJoi === true) {
            return res.status(400).send({ message: error.message, success: false, statusCode: 400 });
        }
        if (error instanceof apiError) {
            return res.status(500).send({ message: error.message, success: false, statusCode: error.statusCode });
        }
    }

})

const loginUser = asyncHandler(async (req, res) => {

    try {
        await createUserLoginValidation.validateAsync(req.body);

        const { phoneNumber, password } = req.body;

        if (phoneNumber.trim() === '' || password.trim() === '') {
            throw new apiError(400, 'All fields are required');
        }
        const user = await User.findOne({ phone: phoneNumber });
        if (!user) {
            throw new apiError(400, 'User not found');
        }
        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) {
            throw new apiError(400, 'Invalid password');
        }
        const { accessToken, refreshToken } = await generateAccessAndRefToken(user._id);


        user.refreshToken = refreshToken
        await user.save()



        const loggedInUser = await User.findById(user._id).select('-password -refreshToken');
        const option = {
            httpOnly: true,
            secure: true
        }

        return res
            .status(200)
            .cookie('refreshToken', refreshToken, option)
            .json(new apiResponse(
                200,
                'Login successful',
                { user: loggedInUser, accessToken, refreshToken }));
    } catch (error) {
        if (error.isJoi === true) {
            return res.status(400).send({ message: error.message, success: false, statusCode: 400 });
        }
        if (error instanceof apiError) {
            return res.status(500).send({ message: error.message, success: false, statusCode: error.statusCode });
        }
    }
})

const logOutUser = asyncHandler(async (req, res) => {
    try {

        await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset: {
                    refreshToken: ""
                }
            },
            {
                new: true
            }
        )
        const option = {
            httpOnly: true,
            secure: true
        }

        return res
            .status(200)
            .clearCookie("accessToken", option)
            .clearCookie("refreshToken", option)
            .json(new apiResponse(200, "User logOut succesfully", {}))

    } catch (error) {

    }
})



const findProductBySearch = asyncHandler(async (req, res) => {
    try {

        const query = req.query.query;
        const results = await ProductModel.find({ productName: { $regex: query, $options: "i" } }); // Case-insensitive search
        res.status(200).json(new apiResponse(200, "product", results))

    } catch (error) {
        console.error("Error searching data:", error);
        res.status(500).json({ message: "Server error" });
    }
})
export {
    registerUser,
    loginUser,
    logOutUser,
    findProductBySearch
}