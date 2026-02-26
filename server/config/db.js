import mongoose from "mongoose";

const connectDB = async () => {

    // If already connected, reuse the connection (important for serverless/Vercel)
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URL, {
            serverSelectionTimeoutMS: 10000, // Give up after 10s instead of hanging forever
        });
        console.log("MongoDB connected");

    } catch (error) {
        // Do NOT call process.exit(1) on Vercel — it kills the entire serverless function
        // and causes FUNCTION_INVOCATION_FAILED errors.
        console.error("Error connecting MongoDB", error.message);
        throw error; // Let the caller handle it gracefully
    }
};

export default connectDB;