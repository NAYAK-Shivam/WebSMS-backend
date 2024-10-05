const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const messageRoutes = require("../routes/messages");
dotenv.config();
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
// Middleware to allow CORS
app.use(
  cors({
    origin: "https://web-sms-frontend.vercel.app",
  })
);

// MongoDB connection
const dbURI = process.env.MONGODB_URI;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.use("/api", messageRoutes);
module.exports = app;
