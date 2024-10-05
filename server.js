const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const messageRoutes = require("./routes/messages");

// Load environment variables
dotenv.config();
const cors = require("cors");

// Initialize Express
const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());
// Middleware to allow CORS
app.use(
  cors({
    origin: "https://web-sms-frontend.vercel.app", // React frontend URL
  })
);
// MongoDB connection
const dbURI = process.env.MONGODB_URI;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Use the message route
app.use("/api", messageRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
