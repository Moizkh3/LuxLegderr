import multer from "multer";

// Use memoryStorage instead of diskStorage.
// Vercel's serverless filesystem is read-only, so writing to "uploads/" will fail in production.
// With memoryStorage, uploaded files are available as req.file.buffer in memory.
const storage = multer.memoryStorage();

// File filter — only allow jpeg/jpg/png
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only .jpeg, .jpg and .png formats are allowed"), false);
    }
};

const upload = multer({ storage, fileFilter });

export default upload;