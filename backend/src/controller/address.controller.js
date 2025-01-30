import { createAddressValidation } from "../middleware/errorHandler.middleware.js";
import { AddressModel } from "../models/address.model.js";
import { User } from "../models/user.Model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"





const addressController = asyncHandler(async (req, res) => {
    try {
        await createAddressValidation.validateAsync(req.body);


        const { country, district, city, tole, muncipility, province, number, userId } = req.body;

        const user = await User.findById(userId)
        if (!user) {
            throw new apiError(400, "User not found");
        }

        console.log("hello");

        const result = await AddressModel.create({
            country,
            district,
            provience: province,
            city,
            tole,
            muncipility,
            number,
            userId: user._id

        })
        console.log(result);

        if (!result) {
            throw new apiError(500, "Error during saving data")
        }
        user.addressDetails = user.addressDetails || [];
        user.addressDetails.push(result._id);
        await user.save();

        res.status(200).json(new apiResponse(200, "Address save succesfully"))
    } catch (error) {
        if (error.isJoi === true) {
            return res.status(400).send({ message: error.message, success: false, statusCode: 400 });
        }
        if (error instanceof apiError) {
            return res.status(500).send({ message: error.message, success: false, statusCode: error.statusCode });
        }
        console.log(error);


    }

})

export { addressController }