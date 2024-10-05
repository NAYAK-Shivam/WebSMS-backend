const express = require("express");
const dotenv = require("dotenv");
const twilio = require("twilio");
const Message = require("../models/Message");

// Load environment variables
dotenv.config();

const router = express.Router();

// Twilio client setup
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

// Route to send message
router.post("/send-message", async (req, res) => {
  const { messageBody } = req.body;

  try {
    // Send the message using Twilio
    const message = await client.messages.create({
      body: messageBody, // Message text
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio number
      to: process.env.RECIPIENT_PHONE_NUMBER, // Recipient number from .env
    });

    // Save the message to MongoDB
    const newMessage = new Message({
      body: messageBody,
      recipient: process.env.RECIPIENT_PHONE_NUMBER,
      messageSid: message.sid,
    });

    await newMessage.save(); // Save to MongoDB

    res
      .status(200)
      .json({ message: "Message sent and saved!", sid: message.sid });
  } catch (error) {
    console.error("Failed to send message:", error);
    res.status(500).json({ error: "Failed to send message." });
  }
});

module.exports = router;
