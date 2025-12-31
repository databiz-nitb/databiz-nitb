// const term = require("multer"); // Keeping the require as is, but variable name should be multer
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const dotenv = require("dotenv");

const fs = require('fs');

// Explicitly load .env from server root (two levels up from src/middlewares)
const envPath = path.join(__dirname, "../../.env");
console.log("DEBUG: Resolved envPath:", envPath);

// Manual FS Check & Parse
if (fs.existsSync(envPath)) {
    try {
        const rawContent = fs.readFileSync(envPath, 'utf8');
        console.log("DEBUG: .env file read successfully. Length:", rawContent.length);

        // Parse raw content to see KEYS ONLY (masking values)
        const parsedConfig = dotenv.parse(rawContent);
        console.log("DEBUG: Keys found in .env:", Object.keys(parsedConfig));

        // Load into process.env if keys look valid
        const result = dotenv.config({ path: envPath });
        if (result.error) {
            console.log("DEBUG: dotenv.config error:", result.error);
        }
    } catch (fsErr) {
        console.error("DEBUG: Failed to read .env file:", fsErr.message);
    }
} else {
    console.error("DEBUG: .env file NOT FOUND at:", envPath);
}

// Configure Cloudinary
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error("DEBUG: Environment Variables AFTER loading:");
    console.error("CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
    console.error("API_KEY:", process.env.CLOUDINARY_API_KEY);
    throw new Error("Cloudinary configuration missing. Please check your .env file.");
}

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error("Cloudinary credentials missing in .env file");
    throw new Error("Cloudinary configuration missing");
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "databiz", // Folder name in Cloudinary
        allowed_formats: ["jpg", "png", "jpeg", "webp"],
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
