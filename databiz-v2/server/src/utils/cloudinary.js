const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const path = require("path");

// Ensure environment variables are loaded
const envPath = path.join(__dirname, "../../.env");
dotenv.config({ path: envPath });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Extracts the public ID from a Cloudinary URL and deletes the image.
 * @param {string} imageUrl - The full URL of the image.
 * @returns {Promise<void>}
 */
const deleteFromCloudinary = async (imageUrl) => {
    if (!imageUrl) return;

    try {
        // Extract public ID from URL
        // Example URL: https://res.cloudinary.com/cloud_name/image/upload/v1234567890/databiz/filename.jpg
        // We need "databiz/filename" (without extension)

        const parts = imageUrl.split('/');
        const uploadIndex = parts.indexOf('upload');

        if (uploadIndex === -1) {
            console.warn("Invalid Cloudinary URL, skipping deletion:", imageUrl);
            return;
        }

        // Get everything after 'upload/v<version>/' or just 'upload/'
        // Usually it's folder/public_id.format

        // Simplest way: get the last part and remove extension, and prepend folder if it exists in the URL structure we expect
        // But our upload middleware sets folder: "databiz".
        // So the public_id usually includes "databiz/".

        // Let's use a regex to be safer for standard Cloudinary URLs
        // Matches everything after the version number (or upload/) up to the file extension
        const regex = /\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z]+$/;
        const match = imageUrl.match(regex);

        if (match && match[1]) {
            const publicId = match[1];
            console.log(`Deleting image from Cloudinary with public_id: ${publicId}`);
            await cloudinary.uploader.destroy(publicId);
            console.log(`Successfully deleted image: ${publicId}`);
        } else {
            console.warn("Could not extract public ID from URL:", imageUrl);
        }

    } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
        // We don't throw here to avoid failing the main delete operation (blog/event deletion)
        // logging is sufficient for cleanup tasks
    }
};

module.exports = { deleteFromCloudinary };
