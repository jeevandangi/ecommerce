import { CategoryModel } from "../models/category.model.js";
import { ProductModel } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudnary } from "../utils/cloudnary.js";
import { apiError } from "../utils/apiError.js"
import { apiResponse } from "../utils/apiResponse.js"
import path from "path"
import { User } from "../models/user.Model.js";
import { OrderModel } from '../models/order.model.js'




const addProductController = asyncHandler(async (req, res) => {
    try {
        const { productName, brand, price, catageory, description, quantity, discount } = req.body;

        if (!req.file || !req.file.path) {
            throw new apiError(400, "No file uploaded");
        }

        const filePath = req.file.path;
        const absoluteFilePath = path.resolve(filePath);

        // Find the category
        const cate = await CategoryModel.findById({ catageory });
        if (!cate) {
            throw new apiError(400, "Invalid Category");
        }

        // Upload to Cloudinary
        const cloudinaryResponse = await uploadOnCloudnary(absoluteFilePath);
        if (!cloudinaryResponse) {
            throw new apiError(500, "Cloudinary upload failed");
        }

        // Create product
        const product = await ProductModel.create({
            productName,
            brand,
            price,
            quantity,
            categoryid: cate._id,
            image: cloudinaryResponse.url,
            discount,
            description,
        });

        if (!product) {
            throw new apiError(400, "Error saving product data");
        }

        // Send response
        res.status(201).json(new apiResponse(201, 'Product saved successfully', product));

    } catch (error) {
        console.error("Error in addProductController:", error);

        if (error instanceof apiError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
});

const getProductController = asyncHandler(async (req, res) => {

    try {
        const { sort } = req.query


        let sortCriteria = {}
        if (sort === 'price') {
            sortCriteria = { price: 1 }
        } else if (sort === 'discount') {
            sortCriteria = { discount: -1 }
        }

        const product = await ProductModel.find().sort(sortCriteria);
        if (!product) {
            throw new apiError(400, "No product found")
        }
        res.status(200).json(new apiResponse(200, "Product Details", product))

    } catch (error) {
        console.error("Error in addProductController:", error);

        if (error instanceof apiError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
})

const getrequestedProductData = asyncHandler(async (req, res) => {

    try {
        const product = await ProductModel.findById(req.params.id);

        console.log(product);

        if (!product) {
            throw new apiError(400, "No product found")
        }
        res.status(200).json(new apiResponse(200, "Product Details", product))

    } catch (error) {
        console.error("Error in addProductController:", error);

        if (error instanceof apiError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
})



const productbycategory = asyncHandler(async (req, res) => {

    try {
        const { id } = req.params
        console.log("id", id);

        const product = await ProductModel.find({ categoryid: id });


        console.log(product);


        if (!product) {
            throw new apiError(400, "No product found")
        }
        res.status(200).json(new apiResponse(200, "Product Details", product))

    } catch (error) {
        console.error(error);

        if (error instanceof apiError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
})





const viewSearchProduct = asyncHandler(async (req, res) => {

    try {
        const { id } = req.params
        console.log("id", id);

        const product = await ProductModel.find({ _id: id });


        console.log(product);


        if (!product) {
            throw new apiError(400, "No product found")
        }
        res.status(200).json(new apiResponse(200, "Product Details", product))

    } catch (error) {
        console.error(error);

        if (error instanceof apiError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
})






const getDashboardStats = asyncHandler(async (req, res) => {
    try {
        const totalProducts = await ProductModel.countDocuments();
        const totalOrders = await OrderModel.countDocuments();
        const totalUsers = await User.countDocuments();

        console.log(totalProducts);


        // Calculate total sales (assuming each order has a 'totalAmount' field)
        const totalSalesData = await OrderModel.aggregate([
            { $group: { _id: null, totalSales: { $sum: "$totalAmt" } } },
        ]);

        const totalSales = totalSalesData.length > 0 ? totalSalesData[0].totalSales : 0;

        res.status(200).json(new apiResponse(200, "Details", {
            totalProducts,
            totalOrders,
            totalUsers,
            totalSales,
        },))
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching dashboard statistics",
        });
    }
});





export {
    addProductController,
    getProductController,
    getrequestedProductData,
    productbycategory,
    viewSearchProduct,
    getDashboardStats
}