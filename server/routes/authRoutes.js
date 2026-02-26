import express from "express";
import { registerUser, loginUser, getUserInfo } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/getUser", protect, getUserInfo);

router.post("/upload-image", upload.single("image"), (req, res) => {

    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    // multer memoryStorage stores the file in req.file.buffer (no filename/path).
    // We convert it to a base64 data URL so the frontend can display and store it.
    const base64 = req.file.buffer.toString("base64");
    const imageUrl = `data:${req.file.mimetype};base64,${base64}`;

    res.status(200).json({ imageUrl });
});



export default router;
