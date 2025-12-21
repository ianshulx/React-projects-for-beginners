import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

/**
 * Uploads file to Cloudinary and returns secure URL
 * Deletes local file after successful upload
 * @param {string} filePath - Local file path to upload
 * @returns {string} - Cloudinary secure URL
 */
const uploadOnCloudinary = async (filePath) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    try {
        const result = await cloudinary.uploader.upload(filePath);
        fs.unlinkSync(filePath);
        return result.secure_url;
    } catch (error) {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        console.error("Error uploading to Cloudinary:", error);
        throw error;
    }
}

export default uploadOnCloudinary;
