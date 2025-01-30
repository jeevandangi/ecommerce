import { apiError } from "../utils/apiError.js";
import { CategoryModel } from "../models/category.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import path from 'path'
import { uploadOnCloudnary } from "../utils/cloudnary.js";


const addCategory = asyncHandler(async (req, res) => {
    try {
        const { category } = req.body;
        if (category == "") {
            throw new apiError(400, "Category must be required")
        }
        console.log(category);

        const filePath = req.file.path;


        const absoluteFilePath = path.resolve(filePath);


        const cloudinaryResponse = await uploadOnCloudnary(absoluteFilePath);
        if (!cloudinaryResponse) {
            throw new apiError(500, "Cloudinary upload failed");
        }
        console.log(cloudinaryResponse);

        const categoryStore = await CategoryModel.create({
            categoryName: category.toLowerCase(),
            categoryImage: cloudinaryResponse.url
        })
        if (!categoryStore) {
            throw new apiError(400, "Failed to add category")
        }


        res.status(201).json(new apiResponse(201, "Category added succesfully"))
    } catch (error) {
        if (error instanceof apiError) {
            return res.status(500).send({ message: error.message, success: false, statusCode: error.statusCode });
        }

    }
})


const getAllCategory = asyncHandler(async (req, res) => {
    try {
        const category = await CategoryModel.find()
        if (!category) {
            throw new apiError(400, "No category found")
        }
        res.status(200).json(new apiResponse(200, "Categroy found", category))
    } catch (error) {
        if (error instanceof apiError) {
            return res.status(500).send({ message: error.message, success: false, statusCode: error.statusCode });
        }
    }
})


const getCategoryById = asyncHandler(async (req, res) => {
    try {
        const category = await CategoryModel.findById(req.params.id);
        console.log("hello");

        if (!category) {
            throw new apiError(400, "Category not found");
        }
        res.status(200).json(new apiResponse(200, "Category found", category));

    } catch (error) {
        // If error is an instance of apiError, handle it specifically
        if (error instanceof apiError) {
            return res.status(error.statusCode).send({ message: error.message, success: false, statusCode: error.statusCode });
        }

        // Handle any other unexpected errors
        console.error(error);
        return res.status(500).send({ message: "An unexpected error occurred", success: false, statusCode: 500 });
    }

})



const updatecategory = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { categoryName } = req.body;
        if (!categoryName) {
            throw new apiError(400, 'Please enter a data')
        }
        const result = await CategoryModel.findOneAndUpdate(
            { _id: id },
            { $set: { categoryName: categoryName } }
        )
        if (!result) {
            throw new apiError(400, 'Failed to updata category')
        }
        res.status(200).json(new apiResponse(200, "Updated succesfully", null))


    } catch (error) {
        if (error instanceof apiError) {
            return res.status(500).send({ message: error.message, success: false, statusCode: error.statusCode });
        }
    }
})



const getCategory = asyncHandler(async (req, res) => {
    try {
        const data = await CategoryModel.find().sort({ createdAt: -1 })
        res.status(201).json(new apiResponse(201, data))
    } catch (error) {

        return res.status(500).send({ success: false, error });


    }
})




const deleteCategory = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const result = await CategoryModel.findOneAndDelete({ _id: id })

        if (!result) {
            throw new apiError(400, "Failed to delete category")
        }

        res.status(201).json(new apiResponse(201, "Category deleted succesfully"))
    } catch (error) {

        if (error instanceof apiError) {
            return res.status(500).send({ message: error.message, success: false, statusCode: error.statusCode });
        }

    }
})






export {
    addCategory,
    getCategory,
    getCategoryById,
    updatecategory,
    deleteCategory,
    getAllCategory
}