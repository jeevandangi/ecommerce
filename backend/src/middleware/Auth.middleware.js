import { User } from "../models/user.Model.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Jwt from "jsonwebtoken"


const verifyLogOut = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.body.token || req.header("authorization")?.replace(/^Bearer\s+/i, "");
        if (!token) {
            throw new apiError(401, "Unauthorized request")
        }

        const verifyToken = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if (!verifyToken) {
            throw new apiError(400, "Invalid token")
        }
        const user = await User.findById(verifyToken?._id)
        if (!user) {
            throw new apiError(400, "Invalid access token")
        }

        req.user = user;
        next()
    } catch (error) {


        if (error instanceof apiError) {
            return res.status(500).send({ message: error.message, success: false, statusCode: error.statusCode });
        }
        return res.status(500).send({ message: "Internal server error", success: false });


    }
})

export { verifyLogOut }