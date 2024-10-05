const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const messageRoutes = require("../routes/messages"); // Adjust path if necessary
dotenv.config();
const cors = require("cors");

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());
// Middleware to allow CORS
app.use(
  cors({
    origin: "https://web-sms-frontend.vercel.app", // React frontend URL
  })
);
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// MongoDB connection
const dbURI = process.env.MONGODB_URI;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Use the message route
app.use("/api", messageRoutes);

// Export the app for serverless deployment
module.exports = app;
