const express = require("express");
const dotenv = require("dotenv");
const twilio = require("twilio");
const Message = require("../models/Message");
dotenv.config();

const router = express.Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

router.post("/send-message", async (req, res) => {
  const { messageBody } = req.body;

  try {
    const message = await client.messages.create({
      body: messageBody,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: process.env.RECIPIENT_PHONE_NUMBER,
    });
    const newMessage = new Message({
      body: messageBody,
      recipient: process.env.RECIPIENT_PHONE_NUMBER,
      messageSid: message.sid,
    });

    await newMessage.save();

    res
      .status(200)
      .json({ message: "Message sent and saved!", sid: message.sid });
  } catch (error) {
    console.error("Failed to send message:", error);
    res.status(500).json({ error: "Failed to send message." });
  }
});

module.exports = router;
