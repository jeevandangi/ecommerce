import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
    api_key: process.env.CLOUDNARY_API_KEY,
    api_secret: process.env.CLOUDNARY_SECRET_KEY,
});

const uploadOnCloudnary = async (localFilePath) => {
    try {
        if (!localFilePath) throw new Error("File path is missing.");


        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        // Optionally delete the local file after upload
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }


        return response;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        return null;
    }
};

export { uploadOnCloudnary };
