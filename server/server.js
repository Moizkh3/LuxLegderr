import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

// __dirname is not available in ES Modules, so we derive it
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware to handle CORS
// Note: Do NOT include "*" wildcard when credentials: true is set — browsers will block it
app.use(cors());

app.use(express.json());

// Connect to MongoDB lazily per request (safe for Vercel serverless).
// connectDB() reuses an existing connection if already open.
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error("DB connection failed:", err.message);
        res.status(503).json({ message: "Database unavailable. Please try again." });
    }
});

// Health-check route — required so visiting "/" doesn't return "Cannot GET /"
app.get("/", (req, res) => {
    res.status(200).json({ status: "Server is live 🚀" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// Only serve the uploads folder when running locally (Vercel filesystem is read-only)
if (process.env.NODE_ENV !== "production") {
    // Auto-create uploads folder if it doesn't exist (local dev only)
    const uploadsDir = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }
    app.use("/uploads", express.static(path.join(__dirname, "uploads")));
}

// Start the server only when running locally.
// On Vercel, the app is exported below and Vercel handles the server lifecycle.
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

// Export app for Vercel serverless deployment
export default app;

