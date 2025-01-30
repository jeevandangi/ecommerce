import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema(
    {

        categoryName: {
            type: String,
            required: true,
            lowercase: true
        },
        categoryImage: {
            type: String,
            required: true
        }

    }, { timestamps: true })


export const CategoryModel = mongoose.model('CategoryModel', CategorySchema)